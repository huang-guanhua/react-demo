// import React, { useState, useEffect } from 'react';
// import Rule from './rule';
// import './add.css';

// function AddComponent() {
//   const [count, setCount] = useState(0);

//   function addAction(type) {
//     //console.log(type);
//     setCount(type === '-' ? (count - 1) : (count + 1));
//   }
//   useEffect(() => {
//     // let a = 10;
//     // console.log(count, 'count');
//     // new Promise((resolve) => {
//     //   setTimeout(() => {
//     //     resolve('hello Promise');
//     //   }, 2000);
//     // }).then((rej) => {
//     //   a++;
//     //   console.log(rej, a, 'rej,a');
//     // });
//   }, []);
//   return (
//     <div className="content">
//       <Rule />
//       <div onClick={count > 0 ? addAction.bind(null, '-') : null}>-</div>
//       <div>{count}</div>
//       <div onClick={addAction.bind(null, '+')}>+</div>
//     </div>
//   );
// }

// export default AddComponent;


import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import _ from '@tencent/now-activity-util';
import './index.less';
// 创建要加载的图片
const imgs = (imgFile) => {
    const imgsArr = [];
    for (let i = 0; i < imgFile.length; i++) {
        imgsArr.push(imgFile[i]);
    }
    return imgsArr;
};
class CanvasBanner extends Component {
    constructor(...args) {
        super(...args);
        this.preload = {};
    }
    componentDidMount() {
        setTimeout(() => {
            this.animateInit();
        }, 1600);
        this.drawFirstFrame();
    }
    drawFirstFrame = () => {
        const {canvasParams = []} = this.props;
        canvasParams.forEach(canvas => {
            const imgObj = new Image();
            imgObj.onload = () => {
                const {name, speed, repeat, delay, destroyAfterFinished} = canvas;
                const opts = {repeat, speed, delay, destroyAfterFinished};
                this.drawFirstFrameOnCanvas(this.refs[name], imgObj, opts);
            };
            imgObj.src = canvas.imgFile[0];
        });
    };
    animateInit() {
        const { canvasParams = [] } = this.props;
        canvasParams.forEach(canvas => {
            this.loadImgs(canvas.imgFile, canvas.name, (imgs) => {
                const { name, speed, repeat, delay, destroyAfterFinished } = canvas;
                const opts = { repeat, speed, delay, destroyAfterFinished };
                this.frameAnimate(this.refs[name], imgs, opts);
            });
        });
    }
    preloadImgs(imgFile, name) {
        if (!this.preload[name]) {
            this.preload[name] = new Promise((resolve) => {
                let loaded = 0;             // 已经加载图片的个数
                const loadedImgsArr = [];   // 存放加载的图片
                const imgsArr = imgs(imgFile);
                let imgObj = null;
                imgsArr.forEach(function (value) {
                    imgObj = new Image();
                    imgObj.onload = function () {
                        loaded++;
                        // 这里所有的图片加载完成
                        if (loaded == imgsArr.length) {
                            resolve(loadedImgsArr);
                        }
                    };
                    imgObj.src = value;
                    loadedImgsArr.push(imgObj);
                });
            });
        }
        return this.preload[name];
    }
    loadImgs(imgFile, name, fn) {
        this.preloadImgs(imgFile, name).then((loadedImgsArr) => {
            fn && fn(loadedImgsArr);
        });
    }
    // eslint-disable-next-line no-unused-vars
    drawFirstFrameOnCanvas = (ref, img, opts = {}) => {
        const canvas = ref;
        const ctx = canvas.getContext('2d');
        // 清屏
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 绘制图片
        ctx.drawImage(
            img,
            0, 0, canvas.width, canvas.height
        );
    };
    frameAnimate = (ref, imgsArr, opts = {}) => {
        const { speed = this.props.speed || 25, repeat = true, delay, destroyAfterFinished } = opts;
        const canvas = ref;
        const ctx = canvas.getContext('2d');
        let n = 0;
        let startTime = 0;
        const move = (ts) => {
            const playNext = ts - startTime > speed;
            // 清屏
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 绘制图片
            ctx.drawImage(
                imgsArr[n],
                0, 0, canvas.width, canvas.height
            );
            if (playNext) {
                startTime = ts;
                n++;
            }
            if (n < imgsArr.length) {
                // 逐帧播放图片
                window.requestAnimationFrame(move);
            } else if (repeat) {
                // 图片播放完成，如果 repeat 为 true 则重复播放
                n = 0;
                window.requestAnimationFrame(move);
            } else if (destroyAfterFinished) {
                // 如果只播放一次，则执行清屏方法
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };
        if (delay && delay > 0) {
            setTimeout(() => {
                window.requestAnimationFrame(move);
            }, delay);
        } else {
            window.requestAnimationFrame(move);
        }
    }
    handleRuleClick = (rule) => {
        if (rule && rule.url) {
            // _.openActivityPage(rule.url);
        }
    };
    render() {
        const {
            // eslint-disable-next-line react/prop-types
            className,
            src,
            canvasParams,
            adornParams,
            rule,
            award
        } = this.props;
        return (
            <div className={`canvas-banner ${className}`}>
                <img className="canvas-banner--bg" src={src} />
                {
                    Array.isArray(canvasParams) && canvasParams.map((canvas, index) => {
                        return (
                            <canvas
                                key={`canvas_${index}`}
                                width={canvas.width || 750}
                                height={canvas.height || 800}
                                ref={canvas.name}
                                className={`canvas-banner--canvas canvas-${canvas.name}`}
                                style={canvas.style}
                            />
                        );
                    })
                }
                {
                    Array.isArray(adornParams) && adornParams.map((adorn, index) => {
                        return (
                            <div
                                key={`adorn_${index}`}
                                className={`${adorn.classNames}`}
                                onClick={() => this.handleRuleClick(adorn)} // eslint-disable-line
                            >
                                { adorn.child }
                            </div>
                        );
                    })
                }
                <div className="canvas-banner--btn">
                    {
                        rule ? (
                            <span
                                className="btn__active"
                                onClick={() => { // eslint-disable-line
                                    this.handleRuleClick(rule);
                                }}
                            >
                                {rule.text || '活动规则'}
                            </span>
                        ) : null
                    }
                    {
                        award ? (
                            <span
                                className="btn__active"
                                onClick={() => { // eslint-disable-line
                                    this.handleRuleClick(award);
                                }}
                            >
                                {award.text || '活动奖励'}
                            </span>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}
CanvasBanner.propTypes = {
    /**
     * 背景图片地址
     */
    src: PropTypes.string.isRequired,
    /**
     * canvas动画参数{imgFile: require, name: required, width: optional, height: optional}
     */
    canvasParams: PropTypes.arrayOf(PropTypes.exact({
        name: PropTypes.string.isRequired,
        imgFile: PropTypes.array.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        speed: PropTypes.number,
        delay: PropTypes.number,
        repeat: PropTypes.bool,
        destroyAfterFinished: PropTypes.bool,
        style: PropTypes.object
    })),
    /**
     * 装饰图片参数{classNames: optional, url: optional, child: optional}
     */
    adornParams: PropTypes.array,
    /**
     * 奖励规则{text: optional, url: required}
     */
    award: PropTypes.object,
    /**
     * 活动规则{text: optional, url: required}
     */
    rule: PropTypes.object,
    /**
     * 动画速率，值越小越快
     */
    speed: PropTypes.number
};
export default CanvasBanner;
