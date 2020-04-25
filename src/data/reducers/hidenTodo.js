import { HIDDEN_TODO_SUCCESS } from '../action/index';

export function hideTodo(state = {}, action) {
    const {type, msg} = action;
    switch (type) {
    case HIDDEN_TODO_SUCCESS: {
        if (msg === 'success') {
            const result = action.data || {};
            return Object.assign({}, state, result);
        }
        return state;
    }
    default:
        return state;
    }
}
