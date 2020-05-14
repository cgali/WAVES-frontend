import React, { Component } from "react";
// import Navbar from "../components/navbar/Navbar";
// import Header from "../components/header/Header";
import Loading from "../views/Loading"

export default class Home extends Component {
  render() {
    return (
      <div>
        {/* Home
        <Header />
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <Navbar /> */}
        <Loading />
      </div>
    )
  }
}
