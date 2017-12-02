import React, { Component } from 'react';

class WithObjectAssign extends Component {
    componentDidMount() {
        Object.assign({}, { prop: 'propValue' });
    }

    render() {
        return "ComponentWithObjectAssign";
    }
}

export default WithObjectAssign;
