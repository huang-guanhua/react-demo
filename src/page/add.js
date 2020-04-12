import React, {useState, useEffect} from 'react';
import Rule from './rule';
import './add.css';
function AddComponent() {
    const [count, setCount] = useState(0)

    function addAction(type) {
        console.log(type);
        setCount(type === '-' ? (count - 1) : (count + 1));
    }
    useEffect(() => {
        let a = 10;
        console.log(count, 'count');
        new Promise(resolve => {
            setTimeout(() => {
                resolve('hello Promise')
            }, 2000);
        }).then((rej) => {
            a++;
            console.log(rej,a, 'rej,a');
        });
    }, []);
    return (
        <div className="content">
            <Rule />
            <div onClick={count > 0 ? addAction.bind(null, '-') : null}>-</div>
            <div>{count}</div>
            <div onClick={addAction.bind(null, '+')}>+</div>
        </div>
    );
}

export default AddComponent;
