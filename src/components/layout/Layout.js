import React, { Component } from 'react';
import "../layout/layout.css";
import { Link } from "react-router-dom";


class Layout extends Component {
  render() {
    const { profileImage, children, isLoggedIn, onLogout } = this.props;
    return (
      <div className="layout-container">
        { isLoggedIn && 
          <header className="header-box">
          <button className="logos-box">
            <img clasname="logos" style={{ width: "2.5rem", marginLeft: "0.5rem"}} src="../logos/image-logo.gif" alt="logo img"/>
            <img clasname="logos" style={{ width: "6.5rem", marginLeft: "0.5rem"}} src="../logos/waves-logo.png" alt="logo letter"/>
          </button>
          <button onClick={onLogout}>LOGOUT</button>
          <button className="img-profile-box"><img src={ profileImage } alt="profile"/></button>
        </header>
        }
        { children }
        { isLoggedIn &&
        <nav className="navbar-box">
          <Link className="icon-button surfers" to="surfers-list">
            <img style={{ width: "2rem"}} src="../logos/surfer-icon.png" alt="icon"/>
            <h3>Surfers</h3>
          </Link>
          <Link className="icon-button beaches" to="/beaches-list">
            <img style={{ width: "2rem"}} src="../logos/beach-icon.png" alt="icon"/>
            <h3>Beaches</h3>
          </Link>
          <Link className="icon-button events" to="/events-list">
            <img style={{ width: "2rem"}} src="../logos/event-icon.png" alt="icon"/>
            <h3>Events</h3>
          </Link>
        </nav>
        }
      </div>
      
    )
  }
}


export default Layout;