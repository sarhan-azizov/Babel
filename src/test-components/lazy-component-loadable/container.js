import React, { Component, Fragment } from 'react';
import Loadable from "react-loadable";


class LazyComponentLodableContainer extends Component {
    state = {
        Component: null
    };

    handleLazyLoadComponent = () => {
        this.setState({
            Component: Loadable({
                loader: () => import('./component'),
                loading: () => <div>12312</div>,
            })
        });
    }


    render() {
        const { Component } = this.state;
        return (
            <Fragment>
                {Component && <Component />}
                <button onClick={this.handleLazyLoadComponent}>Load Component usgin loadable</button>
            </Fragment>
        );
    }
}

export default LazyComponentLodableContainer;