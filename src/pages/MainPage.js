import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import Logged from '../components/MainPageLogged';
import Unlogged from '../components/MainPageUnlogged';

import { connect } from "react-redux";
import { getAllTasks } from "../actions/index";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAllTasks = () => {
    fetch("http://localhost:9000/tasks/getAllTasks", {
      headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
    })
      .then((e) => e.json(), (err) => {
        console.log('dupa', err);
      }
      )
      .then(async (tasks) => {
        await this.props.getAllTasks(tasks);
      }).catch(err => {
        localStorage.setItem("token", "");
        localStorage.setItem("logged", false);
        this.props.forceUpdateApp();
        this.forceUpdate();
        alert('You have been logged out.')
      })
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
              {this.props.logged === "false" ? (
                <Unlogged></Unlogged>
              ) : (
                  <Logged getAllTasks={this.getAllTasks}></Logged>
                )}
            </Route>
            <Route path="/LogIn">
              {localStorage.getItem("logged") === "true" ? (
                <Redirect to="/"></Redirect>
              ) : (
                  <LoginComponent
                    handleLabelStyle={this.handleLabelStyle}
                    forceUpdateApp={this.props.forceUpdateApp}
                  ></LoginComponent>
                )}
            </Route>
            <Route path="/Register">
              <RegisterComponent
                handleLabelStyle={this.handleLabelStyle}
              ></RegisterComponent>
            </Route>
            <Redirect to="/"></Redirect>
          </Switch>
        </main>
      </>
    );
  }
}

const MDTP = { getAllTasks };

export default connect(null, MDTP)(MainPage);
