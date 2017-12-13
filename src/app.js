import React from 'react';

import { WithObjectAssign, WithMemoryLeak } from './test-components';

const App = () => (
    [<WithObjectAssign key="1" />, <WithMemoryLeak key="2" />]
);


export default App;