import React, { Component, Fragment } from 'react';

function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                component: component
            });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}

class LazyComponentContainer extends Component {
    state = {
        LazyComponent: null
    };

    handleLazyLoadComponent = () => {
        this.setState({ LazyComponent: asyncComponent(() => import('./component.js')) });
    };

    render() {
        const { LazyComponent } = this.state;
        return (
            <Fragment>
                {LazyComponent ? <LazyComponent /> : 'loading'}
                <button onClick={this.handleLazyLoadComponent}>Load Component</button>
            </Fragment>
        );
    }
}

export default LazyComponentContainer;