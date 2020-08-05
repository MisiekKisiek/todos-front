import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

import Main from '../components/Main'

import { connect } from "react-redux";
import {
  getAllTasks
} from "../actions/index";

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  getAllTasks = () => {
    fetch('http://localhost:9000/tasks/getAllTasks', { headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` } }).then(e => {
      if (e.status === 401) {
        alert('You have been logged out.')
      }
      return e.json();
    }).then(async tasks => {
      await this.props.getAllTasks(tasks)
    }).catch(err => {
      localStorage.setItem("token", "");
      localStorage.setItem("logged", false);
      this.forceUpdate();
      console.log(err)
    })
  }

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
              <Main getAllTasks={this.getAllTasks}></Main>
            </Route>
            <Route path="/LogIn">
              {localStorage.getItem('logged') === 'true' ? <Redirect to='/'></Redirect> : <LoginComponent handleLabelStyle={this.handleLabelStyle} ></LoginComponent>}
            </Route>
            <Route path="/Register">
              <RegisterComponent handleLabelStyle={this.handleLabelStyle}></RegisterComponent>
            </Route>
            <Redirect to="/"></Redirect>
          </Switch>
          <button onClick={() => { this.forceUpdate() }}>update</button>
        </main>
      </>
    );
  }
}

const MDTP = { getAllTasks }

export default connect(null, MDTP)(MainPage);
