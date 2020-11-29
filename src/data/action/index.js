//import axios from 'axios';

export const ADD_TODO = 'ADD_TODO';

export const HIDDEN_TODO = 'HIDDEN_TODO';
export const HIDDEN_TODO_SUCCESS = 'HIDDEN_TODO_SUCCESS';
export const HIDDEN_TODO_FAIL = 'HIDDEN_TODO_FAIL';

export function addTodo(data) {
  return {
    type: ADD_TODO,
    data,
  };
}

export function hidenTodo() {
    return {
        "Call_API": {
            url: '/info',
            types: [HIDDEN_TODO,HIDDEN_TODO_SUCCESS,HIDDEN_TODO_FAIL],
            type: 'get',
            data: {
                id: 18103,
                domain: 'bdfykfpt'
            }
        }
    };
  }


// export const getHttpAction = (url) => {
//     return (dispatch) => {
//         axios.get(url).then(function(res){
//             const action = res
//             dispatch(hidenTodo(action))
//         })
//     }
// }
