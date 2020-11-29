import axios from 'axios';
const CALL_API = 'Call_API';

// function returnStatus(status){
//     return status === 200 ? 'sucess' : 'fail';
// }

//export default store => next => action => {
export default () => next => action => {

    const options = action[CALL_API];
    if (options === undefined) {
        next(action);
    }

    const {url, types, type, data} = options;

    if (type == "get") {
        axios({
            method: type,
            url: url,
            params: {
                ...data
            }
        })
        .then((response) => {
            const typeData = {type: types[1]}
            //const storeStatus = returnStatus(response.status);
            //const res = Object.assign({}, response, typeData, {storeStatus: storeStatus})
            const data = response.data || {};
            //console.log(data, 'response');
            // if(data.code === 0) {
            if(data) {
                const res = Object.assign({}, data, typeData);
                next(res);
            } else {
                next({type: types[2]})
            }
        }).catch((err) => {
            console.log(err, 'err');
        })
    }

    // if (type == "post") {

    // }



    // console.log(store.dis, 'store');
    // console.log(action, 'action');
    //next(action);
}
