import React, { Component } from 'react';
import { Link } from "react-router-dom";

import "../layout/layout.css";

class Layout extends Component {
  

  state = {
    isVisible: false,
    backgroundColor: '#26afe6',
    surfersActive: '#26afe6',
    beachesActive: '#26afe6',
    eventsActive: '#26afe6',
  }

  componentDidMount = () => {
    const {user} = this.props;
    console.log('layout:',user)
  }

  handleLayoutLogout = (e) => {
    e.preventDefault();
    const { onLogout } = this.props;
    onLogout()
    this.handleOverlay()
    this.setState({
      surfersActive: '#26afe6',
      beachesActive: '#26afe6',
      eventsActive: '#26afe6',
    })
  }

  handleVisibility = () => {
    this.setState({
      isVisible: !this.state.isVisible,
      backgroundColor: this.state.backgroundColor === '#26afe6' ? '#b7f5fa' : '#26afe6',
    })
  }

  handleOverlay = () => {
    this.setState({
      isVisible: false,
      backgroundColor: '#26afe6',
      surfersActive: '#26afe6',
      beachesActive: '#26afe6',
      eventsActive: '#26afe6',
    })
  }

  handleStateBurguer = () => {
    this.setState({
      isVisible: false,
      backgroundColor: '#26afe6',
      surfersActive: '#26afe6',
      beachesActive: '#26afe6',
      eventsActive: '#26afe6',
    })
  }

  handleSurfers = () => {
    this.setState({
      isVisible: false,
      backgroundColor: '#26afe6',
      surfersActive: '#b7f5fa',
      beachesActive: '#26afe6',
      eventsActive: '#26afe6',
    })
  }

  handleBeaches = () => {
    this.setState({
      isVisible: false,
      backgroundColor: '#26afe6',
      surfersActive: '#26afe6',
      beachesActive: '#b7f5fa',
      eventsActive: '#26afe6',
    })
  }

  handleEvents = () => {
    this.setState({
      isVisible: false,
      backgroundColor: '#26afe6',
      surfersActive: '#26afe6',
      beachesActive: '#26afe6',
      eventsActive: '#b7f5fa',
    })
  }

  handleImage = () => {
    const { user } = this.props;
    if (user.data === undefined || user.data.image === "" ) {
      return "../standard.png"
    } else {
      return user.data.image
    }
  }


  render() {
    const { user, children, isLoggedIn } = this.props;
    const { isVisible, backgroundColor, surfersActive, beachesActive, eventsActive } = this.state;
    return (
      <div className="layout-container">
        { (isLoggedIn && user) && 
          <header className="header-box">
            <div className="burger-menu-and-buttons-box">
              {isVisible && (
              <>
              <div className='overlay' onClick={this.handleOverlay} />
              <div className="layout-burguer-menu">
                <Link className="burguer-menu-link" onClick={this.handleStateBurguer} to="/profile-update">Edit profile</Link>
                <Link className="burguer-menu-link" onClick={this.handleStateBurguer} to="/add-event">New event</Link>
                <Link className="burguer-menu-link" onClick={this.handleStateBurguer} to="/about-us">About us</Link>
                <Link className="burguer-menu-link" onClick={this.handleStateBurguer} to="/contact">Contact</Link>
                <button className="logout-button" onClick={this.handleLayoutLogout}>Logout</button>
              </div>
              </>
              )}
              <button className="logos-box" style={{ backgroundColor: backgroundColor }} onClick={this.handleVisibility}>
                <img className="logos" style={{ width: "2.5rem", marginLeft: "0.5rem" }} src="../logos/image-logo.png" alt="logo img"/>
                <img className="logos" style={{ width: "6.5rem", marginLeft: "0.5rem" }} src="../logos/waves-logo.png" alt="logo letter"/>
              </button>
            </div>
            <Link className="layout-profile-button" to="/profile" ><img onClick={this.handleOverlay} className="img-profile-box" src={ this.handleImage() } alt="profile"/></Link>
          </header>
        }
        { children }
        { (isLoggedIn && user) &&
          <nav className="navbar-box">
            <Link onClick={this.handleSurfers} style={{ backgroundColor: surfersActive }} className="icon-button surfers" to="/surfers-list">
              <img style={{ width: "2rem"}} src="../logos/surfer-icon.png" alt="icon"/>
              <h3>Surfers</h3>
            </Link>
            <Link onClick={this.handleBeaches} style={{ backgroundColor: beachesActive }} className="icon-button beaches" to="/beaches-list">
              <img style={{ width: "2rem"}} src="../logos/beach-icon.png" alt="icon"/>
              <h3>Beaches</h3>
            </Link>
            <Link onClick={this.handleEvents} style={{ backgroundColor: eventsActive }} className="icon-button events" to="/events-list">
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