import React, { Component } from "react";

import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";

class App extends Component {
  state = {};

  componentDidMount() {
    localStorage.setItem("token", "");
    localStorage.setItem("logged", false);
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <MainPage></MainPage>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
