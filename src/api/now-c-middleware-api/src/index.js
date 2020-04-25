import DB from '@tencent/db';
import { camelizeKeys, decamelizeKeys } from 'humps';

const serverInfo = {
    ip: '',
    port: ''
};

const API_ROOT = '//now.qq.com';
const STATUS = 'storeStatus';
const PROTOCOL = 'https';

export const CALL_API = 'Call API';

let frequencyMap = {};
/**
 * 最大频率 N次/s
 * @type {number}
 */
const MAX_FREQUENCY = 10;
// 默认2次/s
const DEFAULT_FREQUENCY = 2;
/**
 * 初始池子大小，用完即启用频率限制
 * @type {number}
 */
let initial_remaning_count = 10;
/**
 * 超过频率限制
 * @param opts
 */
function outOfFrequency(opts) {
    const {
        url,
        data,
        frequency, // 默认2次/s
        frequencyLimitWithData = true // 频率限制是否包含参数，默认true
    } = opts;
    const key = frequencyLimitWithData ? `${url}?${JSON.stringify(data)}` : url;
    const _frequency = Math.min(parseInt(frequency) || DEFAULT_FREQUENCY, MAX_FREQUENCY);
    let status = initial_remaning_count <= 0 && ((new Date().getTime() - (frequencyMap[key] || 0)) < 1000 / _frequency);
    // 设置上一次时间戳
    if (!status) {
        initial_remaning_count > 0 && (--initial_remaning_count);
        frequencyMap[key] = new Date().getTime();
    }
    !status && (frequencyMap[key] = new Date().getTime());
    return status;
}

export default store => next => action => {

    const opts = action[CALL_API];

    if (opts === undefined) {
        return next(action);
    }

    const { url, model, retry, disableLimitFrequency } = opts,
        [requestType, successType, failureType] = opts.types;
    const startTime = new Date();

    // 限频
    if (!disableLimitFrequency && outOfFrequency(opts)) {
        console.log('频率限制，丢弃请求', url);
        return Promise.reject('频率限制，丢弃请求');
    }

    let retryTimes = -1;
    /*
    在 tsw 中，需要设置 host。url不能够使用绝对路径，例如下面三种绝对路径的写法
    1. http://now.qq.com/cgi-bin/now/web/room/get_top_room_info
    2. http://now.qq.com/cgi-bin/now/web/room/get_top_room_info
    3. //now.qq.com/cgi-bin/now/web/room/get_top_room_info
    则必须得修改为
     opts.host = 'now.qq.com'
     opts.url = '/cgi-bin/now/web/room/get_top_room_info';

     但是浏览器端发送ajax场景又必须得是绝对路径
     */
    // 优先使用 opts 中的 host，当然一般情况不会出现 url 有了host，还会再设置 host 场景的
    if (!opts.host) {
        opts.host = parseUrl(opts.url).host || 'now.qq.com';
    }

    // native set cookie
    function actionWith(_action) {
        _action = Object.assign(action, _action);

        //'wait' 'fetching' 'success' 'fail'
        let obj = {
            [STATUS]: 'fetching'
        };

        switch (_action.type) {
            case successType:
                obj[STATUS] = 'success';
                // frameworkUtil.reportTime("", startTime, new Date(),`get cgi success: ${ opts.url} consume %d ms`);
                break;
            case failureType:
                obj[STATUS] = 'fail';
            // frameworkUtil.reportTime("", startTime, new Date(),`get cgi fail: ${ opts.url} consume %d ms`);

        }

        _action.data = Object.assign(_action.data || {}, obj);

        const finalAction = _action;

        delete finalAction[CALL_API];
        return finalAction;
    }

    let data = Object.assign({}, opts.data);
    next(actionWith({
        type: requestType,
        data
    }));

    if (opts.data && !opts.isFormData) {
        opts.data = decamelizeKeys(opts.data);
    }
    if (serverInfo.ip) {
        opts.ip = serverInfo.ip;
    }
    if (serverInfo.port) {
        opts.port = serverInfo.port;
    }

    function convertData(data) {
        if (typeof opts.convert === 'function') {
            return opts.convert(data);
        } else {
            return camelizeKeys(data);
        }
    }

    const fetch = function() {
        return new DB()
            .ajax(opts)
            .then(data => {
                if (data && data.result) {
                    data.result.extra = opts.extra;
                }

                if (data.networkError) {
                    // 如果是网络错误，则返回失败
                    let finalAction = actionWith({
                        type: failureType,
                        error: data, // TODO 这个值有问题
                        networkError: data.networkError
                    });

                    next(finalAction);
                    typeof opts._onFail === 'function' && opts._onFail(data, next);
                    return Promise.reject(finalAction);
                } else {
                    let finalAction = actionWith({
                        type: successType,
                        transferParam: opts.transferParam,
                        data: convertData(data.result || data || {}),
                        opts: opts
                    });
                    next(finalAction);
                    typeof opts._onSuccess === 'function' && opts._onSuccess(convertData(data.result || data || {}), next);
                    return finalAction;
                }
            })
            .catch((data) => {
                if (retry && !isNaN(retry) && ++retryTimes < retry) {
                    return fetch();
                } else {
                    // ios8下面 stack会存在，注意要限制在非node直出场景时才有必要这么做
                    if ((typeof global === 'undefined') && data && data.stack && !data.retcode) {
                        // error
                        setTimeout(function () {
                            throw data;
                        }, 0);
                    } else {
                        let finalAction = actionWith({
                            type: failureType,
                            error: data
                        });

                        next(finalAction);
                        typeof opts._onFail === 'function' && opts._onFail(data, next);
                        return Promise.reject(finalAction);
                    }
                }
            });
    };

    return fetch();
}

function parseUrl(url) {
    // 如果不是 http或https或者//或者/开头，则先加上 /
    if (!url.match(/^[\/ | http].*/)) {
        url = '/' + url;
    }

    // return str.match(/(https?:)?(\/\/)?([^\/]*)\/(.*)/i)
    let matchResult = url.match(/(https?:)?(\/\/)?([^\/]*)\/(.*)/i);
    if (!matchResult) {
        return {
            protocol: '',
            host: '',
            path: url
        };
    }

    return {
        protocol: matchResult[1] || '',
        host: matchResult[3] || '',
        path: '/' + matchResult[4]
    };
}