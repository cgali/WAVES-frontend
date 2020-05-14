import React, { Component } from 'react';
import "./css/loading.css";
import Background from '../components/background/Background';


class Loading extends Component {
  render() {
    
    return(
      <div>
        <div className="logo-box">
          <img className="logo" style={{ width: '8rem' }} src="./logos/image-logo.gif" alt=""/>
          <h2>Loading...</h2>
        </div>
        <Background />
      </div>
      
    )
  }
}

export default Loading;