import React from 'react';

import Logged from "./MainPageLogged";
import Unlogged from './MainPageUnlogged';

const Test = () => {
    return (<>
        {localStorage.getItem('logged') === "true" ? <Logged></Logged> : <Unlogged></Unlogged>}
    </>);
}

export default Test;