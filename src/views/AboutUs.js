import React, { Component } from 'react';
import "./css/aboutUs.css";


class AboutUs extends Component {
  render() {
    return (
      <div className="about-us-container">
        <div className="about-us-header">
          <h2 className="about-us-title">About us</h2>
          <img className="about-us-image" src="../carles.jpg" alt="Carles Galí"/>
        </div>
        <div className="about-us-description-box">
          <p className="about-us-description">
            <span className="separator-line"></span> Hi my name is Carles Galí, I'm a student of web developer and I'm presenting my final project.
            <br/> Like a surfer, the majority of times I'm going to surf alone and then, maybe, I find some friends 
            at the water to share the waves. But the other times aren't like that. <br/> For that reason, I made WAVES, a 
            social network for surfers. The idea is to meet with others surfers at the beach. <br/> You can post new events 
            and/or join other events. Also, you can know more about the beach where we will go surfing, like the quality of waves, the environment... Rate the quality of 
            different aspects and publish a review of the beach or the event.
          </p>
        </div>
        <div className="about-us-slogan-box">
          <h3 className="about-us-slogan">
            "The best surfer out there is the one having the most fun"
          </h3>
        </div>
      </div>
    )
  }
}

export default AboutUs;