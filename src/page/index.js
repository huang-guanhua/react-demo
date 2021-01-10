// import {hot} from 'react-hot-loader';
import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import Add from './add';
import Test from './test.jsx';
import { addTodo } from '../data/action';
import PropTypes from 'prop-types';
import {hidenTodo} from '../data/action'
import './index.less';
// import imgp from './imgs/timg.jpg';
const imgp = require('./imgs/timg.jpg');


class PageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount(){
        this.props.dispatch(hidenTodo())
    }

    conAction = () => {
    // console.log(this.state.count, 'count**');
    return _.concat([1, 2], [3, 4]);
    }

    // add = () => {
    //     console.log(this.state.count, 'count____');
    // }
    getAction = () => {
        const { todo } = this.props;
        todo();
    }

    render() {
      // console.log(this.conAction(), this.add(), '------');
      //console.log(this.props, '--');
      return (
        <div className="page">
          <div>init pages</div>
          <div>https://github.com/huang-guanhua/react-demo.git</div>
          <div>test Done</div>
          <div>git地址 测试触发钩子---</div>
          <div>git地址 测试触发secret</div>
          <Test />
          <Add />
          <div className="img" />
          <div className="img2" />
          <img width="200" height="200" src={imgp} />
          <div onClick={this.getAction}>dispatch</div>
        </div>
      );
    }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  todo: () => dispatch(addTodo(666)),
  dispatch
});

PageContainer.propTypes = {
    todo: PropTypes.func,
    dispatch: PropTypes.func
}

// export default hot(module)(PageContainer);
export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
