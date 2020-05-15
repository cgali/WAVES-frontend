import React, { Component } from 'react';
import "../navbar/navbar.css";


class Navbar extends Component {
  render() {
    return(
      <section className="navbar-container">
        <button className="icon-button surfers">
          <img style={{ width: "2rem"}} src="../logos/surfer-icon.png" alt="icon"/>
          <h3>Surfers</h3>
        </button>
        <button className="icon-button beaches">
          <img style={{ width: "2rem"}} src="../logos/beach-icon.png" alt="icon"/>
          <h3>Beaches</h3>
        </button>
        <button className="icon-button events">
          <img style={{ width: "2rem"}} src="../logos/event-icon.png" alt="icon"/>
          <h3>Events</h3>
        </button>
      </section>
    )
  }
}

export default Navbar;