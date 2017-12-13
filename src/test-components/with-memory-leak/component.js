import React, { Component } from 'react';

let detachedNodes;

class WithMemoryLeak extends Component {
    handleClearDetachedDOM() {
        detachedNodes = null;
    }

    handleDetachedDOM() {
        const ul = document.createElement('ul');

        for (let i = 0; i < 10; i++) {
            ul.appendChild(document.createElement('li'));
        }

        detachedNodes = ul;
    }

    handleGrowDOMElements() {
        const x = [];

        for (let i = 0; i < 10000; i++) {
            document.body.appendChild(document.createElement('div'));
        }

        x.push(new Array(1000000).join('x'));
    }

    render() {
        return (
            <div>
                <p>Add many divs in body</p>
                <button onClick={this.handleGrowDOMElements}>create</button>
                <p>create node in memory detachedNodes</p>
                <button onClick={this.handleDetachedDOM}>create</button>
                <button onClick={this.handleClearDetachedDOM}>clear</button>
            </div>
        );
    }
}

export default WithMemoryLeak;