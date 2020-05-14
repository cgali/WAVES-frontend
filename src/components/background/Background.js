import React, { Component } from 'react';
import "../background/background.css";


class Background extends Component {
  render() {
    
    return(
      <section className="loading-container">
        <div className="inside-top-part">
          <div className="outside-top-part"></div>
        </div>
        <div className="inside-bottom-part">
          <div className="outisde-bottom-part"></div>
        </div>
      </section>
    )
  }
}

export default Background;