import React from "react";

import Logged from "./MainPageLogged";
import Unlogged from "./MainPageUnlogged";

const Test = (props) => {
  return (
    <>
      {localStorage.getItem("logged") === "false" ? (
        <Unlogged></Unlogged>
      ) : (
        <Logged getAllTasks={props.getAllTasks}></Logged>
      )}
    </>
  );
};

export default Test;
