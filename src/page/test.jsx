import React from 'react';

export default class Test extends React.Component {

    // sum = () => {
    //     return `123`;
    // }

    addAction = () => {
        //console.log(this, 'this');
        //return `xxxxxxx${this.sum()}`;
    }
    render() {
        this.addAction();
        return (
            <div>jsx file</div>
        );
    }
}
