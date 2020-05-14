import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
// import Loading from "../views/Loading"
// import Signup from "../views/Signup";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <Navbar />
        {/* <Loading /> */}
        {/* <Signup /> */}
      </div>
    )
  }
}
