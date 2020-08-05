import React from 'react';

import Logged from "./MainPageLogged";
import Unlogged from './MainPageUnlogged';

const Test = (props) => {
    return (<>
        {localStorage.getItem('logged') === "true" ? <Logged getAllTasks={props.getAllTasks}></Logged> : <Unlogged></Unlogged>}
    </>);
}

export default Test;