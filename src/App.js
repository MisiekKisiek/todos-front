import React, { Component } from "react";

import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";
import MessagesCourtine from "./components/MessagesCourtine";

class App extends Component {
  constructor() {
    super();
    this.state = {
      logged: localStorage.getItem("logged"),
    };
    this.forceUpdateApp = this.forceUpdateApp.bind(this);
  }

  forceUpdateApp() {
    this.setState({
      logged: localStorage.getItem("logged"),
    });
  }

  logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("logged", false);
    localStorage.setItem("user", "");
    localStorage.setItem("email", "");
    this.forceUpdateApp();
  };

  componentDidMount() {
    localStorage.setItem("token", "");
    localStorage.setItem("logged", false);
    localStorage.setItem("user", "");
    localStorage.setItem("email", "");
  }

  handleMessagePopup = (message, callback) => {
    const courtine = document.querySelector(".courtine");
    const messagePopup = document.querySelector(".courtine__message");
    messagePopup.textContent = message;
    if (message === "") courtine.classList.remove("active");
    else courtine.classList.add("active");
  };

  render() {
    return (
      <div className="App">
        <Header logged={this.state.logged} logOut={this.logOut}></Header>
        <MainPage
          forceUpdateApp={this.forceUpdateApp}
          logged={this.state.logged}
          handleMessagePopup={this.handleMessagePopup}
        ></MainPage>
        <Footer></Footer>
        <MessagesCourtine
          handleMessagePopup={this.handleMessagePopup}
        ></MessagesCourtine>
      </div>
    );
  }
}

export default App;
