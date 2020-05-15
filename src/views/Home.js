import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
// import Loading from "../views/Loading"
// import Signup from "../views/Signup";
// import SurfersList from "../views/SurfersList";
// import BeachesList from "../views/BeachesList";
import EventsList from "../views/EventsList";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* <SurfersList /> */}
        {/* <BeachesList /> */}
        <EventsList />
        <Navbar />
        {/* <Loading /> */}
        {/* <Signup /> */}
        
      </div>
    )
  }
}
