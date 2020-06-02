import React, { Component } from 'react';
import "./css/error500.css";
import Background from '../components/background/Background';
import { Link } from 'react-router-dom';


class Error500 extends Component {
  render() {
    return(
      <div>
        <div className="error-container">
          <p className="error-paragraph">Be careful where you go...</p>
          <img className="error" src="./logos/sharks.gif" alt="error gif"/>
          <p className="error-paragraph">...go back and be safe.</p>
          <p className="error-paragraph-footer">If the error persists, don't jump! <br/> <Link className="error-paragraph-contact-footer" to="/contact" >Contact me</Link> and I will solve it</p>
        </div>
        <Background />
      </div>
      
    )
  }
}

export default Error500;