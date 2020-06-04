import React, { Component } from 'react';
import Loading from "../views/Loading";
import Error500 from "../views/Error500";

import "./css/surferProfile.css";

import { Link } from "react-router-dom";
import { UserContext } from '../context/UserContext';

import apiClient from "../services/apiClient";



const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

class SurferProfile extends Component {
  state = {
    surfer: "",
    eventOwner: [],
    eventParticipants: [],
    status: STATUS.LOADING,
  }

  componentDidMount() {
    this.hanldeSurferProfile();
  }

  hanldeSurferProfile = () => {
    let surferId = this.props.match.params.id;
    apiClient
      .surferProfile(surferId)
      .then((responseSurfer) => {
        apiClient
          .eventSurferOwner(surferId)
          .then((responseOwner) => {
            apiClient
              .eventSurferParticipants(surferId)
              .then((responseParticipants) => {
                this.setState({
                  surfer: responseSurfer.data.surfer,
                  eventOwner: responseOwner.data,
                  eventParticipants: responseParticipants.data,
                  status: STATUS.LOADED,
                })
              })
          })
      })
      .catch((error) => {
        this.setState({
          error: error.name,
          status: STATUS.ERROR,
        });
      });
  }
  
  handleStateNavbar = () => {
    const { handleAppStateNavbar } = this.props;
    handleAppStateNavbar()
  }

  surferProfile = () => {
    const { surfer, eventOwner, eventParticipants } = this.state;

    if (surfer) {
      return(
        <UserContext.Consumer>
          {({ handleAppStateNavbar }) => (
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
                      <ul className="surfer-info-list-style">
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
                      <ul className="surfer-info-list-style">
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
                      <p className="surfer-info-title"><strong>Own events:</strong></p>
                      <ul className="surfer-info-list-style">
                        {eventOwner.events.map((event, i) => {
                          return (
                            <li key={i}>
                              <Link className="surfer-info-events-list" to={`/events-list/${event._id}`} >{event.title}</Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <div>
                      <p className="surfer-info-title"><strong>Events where participates:</strong></p>
                      <ul className="surfer-info-list-style">
                        {eventParticipants.events.map((event, i) => {
                          return (
                            <li key={i}>
                              <Link onClick={handleAppStateNavbar} className="surfer-info-events-list" to={`/events-list/${event._id}`} >{event.title}</Link>
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
          )}
        </UserContext.Consumer>
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