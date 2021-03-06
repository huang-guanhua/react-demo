import { ADD_TODO } from '../action/index';

const initialState = {
  num: 0,
};

export function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, num: action.text || 0 };
    default:
      return state;
  }
}
