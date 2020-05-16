import React, { Component } from 'react';
import Error500 from "../views/Error500";


import "./css/surferProfile.css";

import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";



const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

class SurferProfile extends Component {
  state = {
    surfer: "",
    status: STATUS.LOADING,
  }

  componentDidMount() {
    let surferId = this.props.match.params.id;
    console.log(surferId)
    apiClient
      .surferProfile(surferId)
      .then((response) => {
        console.log("data", response.data);
        this.setState({
          surfer: response.data.surfer,
          status: STATUS.LOADED,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.name,
          status: STATUS.ERROR,
        });
      });
  }

  surferProfile = () => {
    const { surfer } = this.state;

    if (surfer !== undefined) {
      return(
        <div className="surfer-profile-container">
          <div>
            <img src={ surfer.image} alt="surfer"/>
            <section>
              <h2>{ surfer.name} { surfer.surname }</h2>
              <div>
                <p><strong>Level:</strong> { surfer.level }.</p>
                <p><strong>Favorite board:</strong> { surfer.favoriteBoard }.</p>
                <div>
                  <p><strong>Waves:</strong></p>
                  <ul>
                    {surfer.typeOfWaves.map((waves, i) => {
                      return (
                        <li key={i}>
                          <p>{waves}</p>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div>
                  <p><strong>Beaches:</strong></p>
                  <ul>
                    {surfer.frequentsBeaches.map((freqBeaches, i) => {
                      return (
                        <li key={i}>
                          <p>{freqBeaches}</p>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div>
                  <p><strong>Events:</strong></p>
                  <ul>
                    {surfer.events.map((event, i) => {
                      return (
                        <li key={i}>
                          <Link to={`/eventProfile/${event._id}`}>{event.title}</Link>
                        </li>
                      )
                    })}
                </ul>
                </div>
              </div>
            </section>
          </div>
          <Link to="/surfers-list">Back</Link>
        </div>
      ) 
    } 
  }

  render() {
    const { status } = this.state;

    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
        return <div>{ status }</div>;
      case STATUS.LOADED:
        return <div>
                { this.surferProfile() }
              </div>
      case STATUS.ERROR:
        return <Error500 />;
    }
  }
}

export default SurferProfile;