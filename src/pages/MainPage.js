import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Logged from "../components/MainPageLogged";
import Unlogged from '../components/MainPageUnlogged';
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

import Test from '../components/Test'

class MainPage extends Component {
  state = {};



  handleLabelStyle = (tab) => {
    tab.forEach(e => {
      if (e[0].current.value !== "") {
        e[1].current.classList.add("active")
      } else { e[1].current.classList.remove("active") }
    })
  }

  render() {
    return (
      <>
        <main className="main">
          <Switch>
            <Route exact path="/">
              <Test></Test>
              {/* {localStorage.getItem('logged') === "true" ? <Logged></Logged> : <Unlogged></Unlogged>}
              {localStorage.getItem('logged')} */}
            </Route>
            <Route path="/LogIn">
              <LoginComponent handleLabelStyle={this.handleLabelStyle}></LoginComponent>
            </Route>
            <Route path="/Register">
              <RegisterComponent handleLabelStyle={this.handleLabelStyle}></RegisterComponent>
            </Route>
            <Redirect to="/"></Redirect>
          </Switch>
        </main>
      </>
    );
  }
}

export default MainPage;
