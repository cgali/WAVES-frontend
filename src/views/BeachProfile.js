import React, { Component } from 'react';
import Error500 from "../views/Error500";


import "./css/beachProfile.css";

import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";



const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

class BeachProfile extends Component {
  state = {
    beach: "",
    status: STATUS.LOADING,
  }

  componentDidMount() {
    let beachId = this.props.match.params.id;
    console.log(beachId)
    apiClient
      .beachProfile(beachId)
      .then((response) => {
        console.log("data", response.data);
        this.setState({
          beach: response.data.beach,
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

  beachProfile = () => {
    const { beach } = this.state;

    if (beach !== undefined) {
      return(
        <div className="beach-profile-container">
          <div>
            <img className="beach-profile-image" src={ beach.image} alt="beach"/>
            <section>
              <h2>{ beach.name}</h2>
              <h2>Features</h2>
              <div>
                <div>
                  <p><strong>Waves:</strong></p>
                  <ul>
                    {beach.typesOfWaves.map((waves, index) => {
                      return (
                        <li key={`${waves}_${index}`}>
                          <p>{waves}</p>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div>
                  <p><strong>Background:</strong></p>
                  <ul>
                      {beach.beachBackground.map((background, i) => {
                        return (
                          <li key={i}>
                            <p>{background}</p>
                          </li>
                        )
                      })}
                    </ul>
                </div>
               
                <p><strong>Social Environment:</strong> { beach.socialEnvironment}.</p>
                <p><strong>Beaches:</strong> { beach.description}</p>
              </div>
            </section>
          </div>
          <Link to="/beaches-list">Back</Link>
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
        return <div className="beach-profile-container">
                { this.beachProfile() }
              </div>
      case STATUS.ERROR:
        return <Error500 />;
    }
  }
}

export default BeachProfile;