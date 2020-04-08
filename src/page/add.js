import React, {useState} from 'react';
import './add.css';
function AddComponent() {
    const [count, setCount] = useState(0)

    function addAction(type) {
        console.log(type);
        setCount(type === '-' ? (count - 1) : (count + 1));
    }
    return (
        <div className="content">
            <div onClick={count > 0 ? addAction.bind(null, '-') : null}>-</div>
            <div>{count}</div>
            <div onClick={addAction.bind(null, '+')}>+</div>
        </div>
    );
}

export default AddComponent;
