import React, { Component } from 'react';
import "./css/loading.css";
import Background from '../components/background/Background';


class Loading extends Component {
  render() {
    
    return(
      <div className="loading-container">
        <div className="logo-box">
          <img className="logo" style={{ width: '15rem' }} src="./logos/surfing.gif" alt=""/>
          <h2>Loading . . .</h2>
        </div>
        <Background />
      </div>
    )
  }
}

export default Loading;