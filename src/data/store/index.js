import { combineReducers } from 'redux';
import * as datalist from '../reducers';

const defalutData = combineReducers({
    ...datalist
});

export default defalutData;
