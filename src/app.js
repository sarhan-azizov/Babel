import React, { Fragment } from 'react';

import { LazyComponent, LazyComponentLodable } from './test-components';

const App = () => (
    <Fragment>
        <LazyComponent />
        <br />
        <LazyComponentLodable />
    </Fragment>
);

export default App;