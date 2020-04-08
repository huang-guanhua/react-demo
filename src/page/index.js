import React from 'react';
import Add from './add';
import './index.less';
class PageContainer extends React.Component {
    render() {
        return (
            <div className="page">
                <div>init page</div>
                <div>https://github.com/huang-guanhua/react-demo.git</div>
                <div>git地址1</div>
                <Add />
                <div className="img"></div>
            </div>
        );
    }
}

export default PageContainer;
