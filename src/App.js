import React, { Component } from "react";

import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";

class App extends Component {
  constructor() {
    super()
    this.state = {
      logged: localStorage.getItem('logged')
    }
    this.forceUpdateApp = this.forceUpdateApp.bind(this)
  }

  forceUpdateApp() {
    this.setState({
      logged: localStorage.getItem('logged')
    })
  }

  logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("logged", false);
    this.forceUpdateApp()
  }

  componentDidMount() {
    localStorage.setItem("token", "");
    localStorage.setItem("logged", false);
  }

  render() {
    return (
      <div className="App">
        <Header logged={this.state.logged} logOut={this.logOut}></Header>
        <MainPage forceUpdateApp={this.forceUpdateApp} logged={this.state.logged}></MainPage>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
