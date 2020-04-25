(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@tencent/db"));
	else if(typeof define === 'function' && define.amd)
		define(["@tencent/db"], factory);
	else if(typeof exports === 'object')
		exports["nowui"] = factory(require("@tencent/db"));
	else
		root["nowui"] = factory(root["@tencent/db"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CALL_API = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _db = __webpack_require__(2);

var _db2 = _interopRequireDefault(_db);

var _humps = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var serverInfo = {
    ip: '',
    port: ''
};

var API_ROOT = '//now.qq.com';
var STATUS = 'storeStatus';
var PROTOCOL = 'https';

var CALL_API = exports.CALL_API = 'Call API';

var frequencyMap = {};
/**
 * 最大频率 N次/s
 * @type {number}
 */
var MAX_FREQUENCY = 10;
// 默认2次/s
var DEFAULT_FREQUENCY = 2;
/**
 * 初始池子大小，用完即启用频率限制
 * @type {number}
 */
var initial_remaning_count = 10;
/**
 * 超过频率限制
 * @param opts
 */
function outOfFrequency(opts) {
    var url = opts.url,
        data = opts.data,
        frequency = opts.frequency,
        _opts$frequencyLimitW = opts.frequencyLimitWithData,
        frequencyLimitWithData = _opts$frequencyLimitW === undefined ? true : _opts$frequencyLimitW;

    var key = frequencyLimitWithData ? url + '?' + JSON.stringify(data) : url;
    var _frequency = Math.min(parseInt(frequency) || DEFAULT_FREQUENCY, MAX_FREQUENCY);
    var status = initial_remaning_count <= 0 && new Date().getTime() - (frequencyMap[key] || 0) < 1000 / _frequency;
    // 设置上一次时间戳
    if (!status) {
        initial_remaning_count > 0 && --initial_remaning_count;
        frequencyMap[key] = new Date().getTime();
    }
    !status && (frequencyMap[key] = new Date().getTime());
    return status;
}

exports.default = function (store) {
    return function (next) {
        return function (action) {

            var opts = action[CALL_API];

            if (opts === undefined) {
                return next(action);
            }

            var url = opts.url,
                model = opts.model,
                retry = opts.retry,
                disableLimitFrequency = opts.disableLimitFrequency,
                _opts$types = _slicedToArray(opts.types, 3),
                requestType = _opts$types[0],
                successType = _opts$types[1],
                failureType = _opts$types[2];

            var startTime = new Date();

            // 限频
            if (!disableLimitFrequency && outOfFrequency(opts)) {
                console.log('频率限制，丢弃请求', url);
                return Promise.reject('频率限制，丢弃请求');
            }

            var retryTimes = -1;
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
                var obj = _defineProperty({}, STATUS, 'fetching');

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

                var finalAction = _action;

                delete finalAction[CALL_API];
                return finalAction;
            }

            var data = Object.assign({}, opts.data);
            next(actionWith({
                type: requestType,
                data: data
            }));

            if (opts.data && !opts.isFormData) {
                opts.data = (0, _humps.decamelizeKeys)(opts.data);
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
                    return (0, _humps.camelizeKeys)(data);
                }
            }

            var fetch = function fetch() {
                return new _db2.default().ajax(opts).then(function (data) {
                    if (data && data.result) {
                        data.result.extra = opts.extra;
                    }

                    if (data.networkError) {
                        // 如果是网络错误，则返回失败
                        var finalAction = actionWith({
                            type: failureType,
                            error: data, // TODO 这个值有问题
                            networkError: data.networkError
                        });

                        next(finalAction);
                        typeof opts._onFail === 'function' && opts._onFail(data, next);
                        return Promise.reject(finalAction);
                    } else {
                        var _finalAction = actionWith({
                            type: successType,
                            transferParam: opts.transferParam,
                            data: convertData(data.result || data || {}),
                            opts: opts
                        });
                        next(_finalAction);
                        typeof opts._onSuccess === 'function' && opts._onSuccess(convertData(data.result || data || {}), next);
                        return _finalAction;
                    }
                }).catch(function (data) {
                    if (retry && !isNaN(retry) && ++retryTimes < retry) {
                        return fetch();
                    } else {
                        // ios8下面 stack会存在，注意要限制在非node直出场景时才有必要这么做
                        if (typeof global === 'undefined' && data && data.stack && !data.retcode) {
                            // error
                            setTimeout(function () {
                                throw data;
                            }, 0);
                        } else {
                            var finalAction = actionWith({
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
        };
    };
};

function parseUrl(url) {
    // 如果不是 http或https或者//或者/开头，则先加上 /
    if (!url.match(/^[\/ | http].*/)) {
        url = '/' + url;
    }

    // return str.match(/(https?:)?(\/\/)?([^\/]*)\/(.*)/i)
    var matchResult = url.match(/(https?:)?(\/\/)?([^\/]*)\/(.*)/i);
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// =========
// = humps =
// =========
// Underscore-to-camelCase converter (and vice versa)
// for strings and object keys

// humps is copyright © 2012+ Dom Christie
// Released under the MIT license.


;(function(global) {

  var _processKeys = function(convert, obj, options) {
    if(!_isObject(obj) || _isDate(obj) || _isRegExp(obj) || _isBoolean(obj) || _isFunction(obj)) {
      return obj;
    }

    var output,
        i = 0,
        l = 0;

    if(_isArray(obj)) {
      output = [];
      for(l=obj.length; i<l; i++) {
        output.push(_processKeys(convert, obj[i], options));
      }
    }
    else {
      output = {};
      for(var key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
          output[convert(key, options)] = _processKeys(convert, obj[key], options);
        }
      }
    }
    return output;
  };

  // String conversion methods

  var separateWords = function(string, options) {
    options = options || {};
    var separator = options.separator || '_';
    var split = options.split || /(?=[A-Z])/;

    return string.split(split).join(separator);
  };

  var camelize = function(string) {
    if (_isNumerical(string)) {
      return string;
    }
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.substr(0, 1).toLowerCase() + string.substr(1);
  };

  var pascalize = function(string) {
    var camelized = camelize(string);
    // Ensure 1st char is always uppercase
    return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
  };

  var decamelize = function(string, options) {
    return separateWords(string, options).toLowerCase();
  };

  // Utilities
  // Taken from Underscore.js

  var toString = Object.prototype.toString;

  var _isFunction = function(obj) {
    return typeof(obj) === 'function';
  };
  var _isObject = function(obj) {
    return obj === Object(obj);
  };
  var _isArray = function(obj) {
    return toString.call(obj) == '[object Array]';
  };
  var _isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };
  var _isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };
  var _isBoolean = function(obj) {
    return toString.call(obj) == '[object Boolean]';
  };

  // Performant way to determine if obj coerces to a number
  var _isNumerical = function(obj) {
    obj = obj - 0;
    return obj === obj;
  };

  // Sets up function which handles processing keys
  // allowing the convert function to be modified by a callback
  var _processor = function(convert, options) {
    var callback = options && 'process' in options ? options.process : options;

    if(typeof(callback) !== 'function') {
      return convert;
    }

    return function(string, options) {
      return callback(string, convert, options);
    }
  };

  var humps = {
    camelize: camelize,
    decamelize: decamelize,
    pascalize: pascalize,
    depascalize: decamelize,
    camelizeKeys: function(object, options) {
      return _processKeys(_processor(camelize, options), object);
    },
    decamelizeKeys: function(object, options) {
      return _processKeys(_processor(decamelize, options), object, options);
    },
    pascalizeKeys: function(object, options) {
      return _processKeys(_processor(pascalize, options), object);
    },
    depascalizeKeys: function () {
      return this.decamelizeKeys.apply(this, arguments);
    }
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (humps),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = humps;
  } else {
    global.humps = humps;
  }

})(this);


/***/ })
/******/ ]);
});