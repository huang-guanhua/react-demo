import React from 'react';
import Add from './add';
import Test from './test.jsx';
import './index.less';
//import imgp from './imgs/timg.jpg';
const imgp = require('./imgs/timg.jpg');

class PageContainer extends React.Component {
    render() {
        return (
            <div className="page">
                <div>init page</div>
                <div>https://github.com/huang-guanhua/react-demo.git</div>
                <div>git地址1</div>
                <Test />
                <Add />
                <div className="img"></div>
                <div className="img2"></div>
                <img width="200" height="200" src={imgp} />
            </div>
        );
    }
}

export default PageContainer;
