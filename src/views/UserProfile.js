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

class UserProfile extends Component {
  state = {
    user: "",
    eventOwner: "",
    eventParticipants: "",
    status: STATUS.LOADING,
  }

  componentDidMount() {
    apiClient
      .profile()
      .then((responseUser) => {
        console.log("data", responseUser.data);
        apiClient
          .eventOwner()
          .then((responseOwner) => {
            console.log("EVENT OWNER:", responseOwner.data.events)
            apiClient
              .eventParticipants()
              .then((responseParticipants) => {
                console.log("EVENT PARTICIPANTS:", responseParticipants.data)
                this.setState({
                  user: responseUser.data,
                  eventOwner: responseOwner.data,
                  eventParticipants: responseParticipants.data,
                  status: STATUS.LOADED
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

  userProfile = () => {
    const { user, eventOwner, eventParticipants } = this.state;

    if (user !== undefined) {
      return(
        <div className="surfer-profile-container">
            <img className="surfer-profile-image" src={ user.image} alt="user"/>
            <section className="surfer-info-box">
            <div className="surfer-info-info">
              <h2 className="surfer-info-name">{ user.name} { user.surname }</h2>
                <div>
                  <p className="surfer-info-title"><strong>Level:</strong> { user.level }.</p>
                  <p className="surfer-info-title"><strong>Favorite board:</strong> { user.favoriteBoard }.</p>
                  <div>
                    <p className="surfer-info-title"><strong>Waves:</strong></p>
                    <ul className="surfer-info-list-style">
                      { user.typeOfWaves.map((waves, i) => {
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
                      { user.frequentsBeaches.map((freqBeaches, i) => {
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
                      { eventOwner.events.map((event, i) => {
                        return (
                          <li key={i}>
                            <Link className="surfer-info-events-list" to={`/events-list/${event._id}`}>{event.title}</Link>
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
                            <Link className="surfer-info-events-list" to={`/events-list/${event._id}`}>{event.title}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
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
                { this.userProfile() }
              </div>
      case STATUS.ERROR:
        return <Error500 />;
    }
  }
}

export default UserProfile;