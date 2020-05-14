import React, { Component } from 'react';
import "./css/error500.css";


class Error500 extends Component {
  render() {
    return(
      <div className="error-container">
        <img className="error" src="./logos/error.gif" alt="error gif"/>
      </div>
      
    )
  }
}


export default Error500;