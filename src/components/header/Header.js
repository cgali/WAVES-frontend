import React, { Component } from 'react';
import "../header/header.css";


class Header extends Component {
  render() {
    const { profileImage } = this.props;
    return (
      <div className="header-container">
        <button className="logos-box">
          <img clasname="logos" style={{ width: "2.5rem"}} src="./logos/image-logo.gif" alt="logo img"/>
          <img clasname="logos" style={{ width: "6.5rem"}} src="./logos/waves-logo.png" alt="logo letter"/>
        </button>
        <button className="img-profile-box"><img src={ profileImage } alt="profile"/></button>
      </div>
    )
  }
}


export default Header;