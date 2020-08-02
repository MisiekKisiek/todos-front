import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Logged from "../components/MainPageLogged";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

class MainPage extends Component {
  state = {};
  render() {
    return (
      <>
        <main className="main">
          <Switch>
            <Route exact path="/">
              <Logged></Logged>
            </Route>
            <Route path="/LogIn">
              <LoginComponent></LoginComponent>
            </Route>
            <Route path="/Register">
              <RegisterComponent></RegisterComponent>
            </Route>
            <Redirect to="/"></Redirect>
          </Switch>
        </main>
      </>
    );
  }
}

export default MainPage;
