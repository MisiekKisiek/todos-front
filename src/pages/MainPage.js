import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import Logged from "../components/MainPageLogged";
import Unlogged from "../components/MainPageUnlogged";
import UserPanel from "../components/UserPanel";

import { connect } from "react-redux";
import { getAllTasks } from "../actions/index";

import { APIPrefix as API } from "../tools/apiPrefixes";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAllTasks = () => {
    fetch(`${API}/tasks/getAllTasks`, {
      headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
    })
      .then(
        (e) => e.json(),
        (err) => {}
      )
      .then(async (tasks) => {
        if (localStorage.getItem("logged") === "true") {
          await this.props.getAllTasks(tasks);
        }
      })
      .catch((err) => {
        localStorage.setItem("token", "");
        localStorage.setItem("logged", false);
        this.props.forceUpdateApp();
        this.forceUpdate();
        if(localStorage.getItem("logged") === false) this.props.handleMessagePopup("You have been logged out.");
      });
  };

  handleLabelStyle = (tab) => {
    tab.forEach((e) => {
      if (e[0].current.value !== "") {
        e[1].current.classList.add("active");
      } else {
        e[1].current.classList.remove("active");
      }
    });
  };

  render() {
    return (
      <>
        <main className="main">
          <Switch>
            <Route exact path="/">
              {localStorage.getItem("logged") === "true" ? (
                <Logged
                  getAllTasks={this.getAllTasks}
                  handleMessagePopup={this.props.handleMessagePopup}
                />) : (
                <Unlogged/>
              )}
            </Route>
            <Route path="/LogIn">
              {localStorage.getItem("logged") === "true" ? (
                <Redirect to="/"/>
              ) : (
                <LoginComponent
                  handleLabelStyle={this.handleLabelStyle}
                  forceUpdateApp={this.props.forceUpdateApp}
                  handleMessagePopup={this.props.handleMessagePopup}
                />
              )}
            </Route>
            <Route path="/Register">
              {localStorage.getItem("logged") === "true" ? (
                <Redirect to="/"/>
              ) : (
                <RegisterComponent
                  handleLabelStyle={this.handleLabelStyle}
                  handleMessagePopup={this.props.handleMessagePopup}
                />
              )}
            </Route>
            <Route path="/User">
              {this.props.logged === "true" ? (
                <UserPanel/>
              ) : (
                <Redirect to="/"/>
              )}
            </Route>
            <Redirect to="/"/>
          </Switch>
        </main>
      </>
    );
  }
}

const MDTP = { getAllTasks };

export default connect(null, MDTP)(MainPage);
