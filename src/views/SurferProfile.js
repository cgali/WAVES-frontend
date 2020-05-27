import React, { Component } from 'react';
import Loading from "../views/Loading";
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
            <img className="surfer-profile-image" src={ surfer.image} alt="surfer"/>
            <section className="surfer-info-box">
              <div className="surfer-info-info">
                <h2 className="surfer-info-name">{ surfer.name} { surfer.surname }</h2>
                <div>
                  <p className="surfer-info-title"><strong>Level:</strong> { surfer.level }.</p>
                  <p className="surfer-info-title"><strong>Favorite board:</strong><br/><span></span>{ surfer.favoriteBoard }.</p>
                  <div>
                    <p className="surfer-info-title"><strong>Waves:</strong></p>
                    <ul>
                      {surfer.typeOfWaves.map((waves, i) => {
                        return (
                          <li key={i}>
                            <p className="surfer-info-list">{waves}</p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div>
                    <p className="surfer-info-title"><strong>Beaches:</strong></p>
                    <ul>
                      {surfer.frequentsBeaches.map((freqBeaches, i) => {
                        return (
                          <li key={i}>
                            <p className="surfer-info-list">{freqBeaches}</p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div>
                    <p className="surfer-info-title"><strong>Events:</strong></p>
                    <ul>
                      {surfer.events.map((event, i) => {
                        return (
                          <li key={i}>
                            <Link className="surfer-info-list" to={`/eventProfile/${event._id}`}>{event.title}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <Link className="surfer-profile-back-button" to="/surfers-list">Back</Link>
            </section>
        </div>
      ) 
    } 
  }

  render() {
    const { status } = this.state;

    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
        return <div><Loading /></div>;
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