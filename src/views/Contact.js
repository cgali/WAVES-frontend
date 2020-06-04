import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './css/contact.css';



class Contact extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#4AFDEB"}}>
        <div className="contact-hide-header">
          <img clasname="logos" style={{ width: "2.5rem", marginLeft: "0.5rem" }} src="../logos/image-logo.png" alt="logo img"/>
          <img clasname="logos" style={{ width: "6.5rem", marginLeft: "0.5rem" }} src="../logos/waves-logo.png" alt="logo letter"/>
        </div>
        <div className="contact-container">
          <div className="contact-header">
            <h2 className="contact-title">Contact</h2>
          </div>
          <div className="contact-information-box">
            <p className="contact-info-text">Send me an <a className="contact-info-email-link" href="mailto:carles_ga@hotmail.com">email</a> and I will response as soon as possible.</p>
            <p className="contact-info-name">Carles Galí Bou</p>
            <p className="contact-info-email">Email: <a className="contact-info-email-link" href="mailto:carles_ga@hotmail.com">carles_ga@hotmail.com</a></p>
          </div>
          <div className="contact-footer">
            <div className="contact-info-social-logos-box">
              <a href="https://www.linkedin.com/in/carles-gal%C3%AD-bou-09115ab2/"><img className="contact-info-social-image" src="../logos/linkedin.png" alt="LinkedIn"/></a>
              <a href="https://github.com/cgali"><img className="contact-info-social-image" src="../logos/github.png" alt="Github"/></a>
              <a href="https://www.instagram.com/gali401/"><img className="contact-info-social-image" src="../logos/instagram.png" alt="Instagram"/></a>
              <a href="https://www.facebook.com/carles.gali/"><img className="contact-info-social-image" src="../logos/facebook.png" alt="Facebook"/></a>
            </div>
            <div className="contact-trademark">
              <img  style={{ width: '2rem' }} src="./logos/image-logo.png" alt=""/>
              <p>© WAVES Trademark</p>
            </div>
          </div>
        </div>
        <div className="contact-hide-footer">
          <Link className="contact-hide-footer-back-button" to="/profile">Back</Link>
        </div>
      </div>
    )
  }
}

export default Contact;