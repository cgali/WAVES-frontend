import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
// import Loading from "../views/Loading"
// import Signup from "../views/Signup";
import SurfersList from "../views/SurfersList";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <SurfersList />
        <Navbar />
        {/* <Loading /> */}
        {/* <Signup /> */}
        
      </div>
    )
  }
}
