import React, { Component } from "react";
import Header from "./components/Header";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home"
import dataUsers from "./pages/dataUsers";
import Product from "./pages/product";
import Corona from "./pages/corona";
import iCom from "./pages/iCom";
class App extends Component {
  state = {

  };

  render() {
    return (
      <div>
        <Header />
        <div className="pt-5 px-5 mx-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product/:bebas" component={Product} />
            <Route path="/corona" component={Corona} />
            <Route path="/dataUsers" component={dataUsers} />
            <Route path="/iCom" component={iCom} />
          </Switch>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
