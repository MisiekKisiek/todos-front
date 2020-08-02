import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <MainPage></MainPage>
      <Footer></Footer>
    </div>
  );
}

export default App;
