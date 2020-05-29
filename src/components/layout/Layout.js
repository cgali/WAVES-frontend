import React, { Component } from 'react';
import "../layout/layout.css";
import { Link } from "react-router-dom";

class Layout extends Component {

  state = {
    isVisible: false,
    backgroundColor: '#26afe6',
    boxShadow: 'none',
    surfersActive: '#26afe6',
    beachesActive: '#26afe6',
    eventsActive: '#26afe6',
  }

  handleLayoutLogout = (e) => {
    const { onLogout } = this.props;
    e.preventDefault();
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
      boxShadow: this.state.boxShadow === 'none' ? '0px 0px 1p 2px #e7c817cb' : 'none',
    })
  }

  handleOverlay = () => {
    this.setState({
      isVisible: false,
      backgroundColor: '#26afe6',
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


  render() {

    const { user, children, isLoggedIn } = this.props;
    const { isVisible, backgroundColor, boxShadow, surfersActive, beachesActive, eventsActive } = this.state;
    console.log('layout ', this.props)
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
                <button className="logout-button" onClick={this.handleLayoutLogout}>Logout</button>
              </div>
              </>
              )}
              <button className="logos-box" style={{ backgroundColor: backgroundColor, boxShadow: boxShadow }} onClick={this.handleVisibility}>
                <img clasname="logos" style={{ width: "2.5rem", marginLeft: "0.5rem" }} src="../logos/image-logo.gif" alt="logo img"/>
                <img clasname="logos" style={{ width: "6.5rem", marginLeft: "0.5rem" }} src="../logos/waves-logo.png" alt="logo letter"/>
              </button>
            </div>
            
            
            <Link onClick={this.handleOverlay} className="layout-profile-button" to="/profile" ><img className="img-profile-box" src={ user.data.image } alt="profile"/></Link>
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