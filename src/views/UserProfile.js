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
    status: STATUS.LOADING,
  }

  componentDidMount() {
    apiClient
      .profile()
      .then((response) => {
        console.log("data", response.data);
        this.setState({
          user: response.data,
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

  userProfile = () => {
    const { user } = this.state;

    if (user !== undefined) {
      return(
        <div className="surfer-profile-container">
          <div>
            <img className="surfer-profile-image" src={ user.image} alt="user"/>
            <section>
              <h2>{ user.name} { user.surname }</h2>
              <div>
                <p><strong>Level:</strong> { user.level }.</p>
                <p><strong>Favorite board:</strong> { user.favoriteBoard }.</p>
                <div>
                  <p><strong>Waves:</strong></p>
                  <ul>
                    {user.typeOfWaves.map((waves, i) => {
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
                    {user.frequentsBeaches.map((freqBeaches, i) => {
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
                    {user.events.map((event, i) => {
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