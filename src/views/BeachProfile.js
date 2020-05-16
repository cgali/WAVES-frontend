import React, { Component } from 'react';
import Error500 from "../views/Error500";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";


import "./css/surferProfile.css";

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
          surfer: response.data.beach,
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
        <div>
          <Header />
          <div>
            <img src={ beach.image} alt="beach"/>
            <section>
              <h2>{ beach.name}</h2>
              <h2>Features</h2>
              <div>
                <div>
                  <p><strong>Waves:</strong></p>
                  <ul>
                    {beach.typeOfWaves.map((waves, i) => {
                      return (
                        <li key={i}>
                          <p>{waves}</p>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <p><strong>Background:</strong> { beach.beachBackground }.</p>
                <p><strong>Social Environment:</strong> { beach.socialEnvironment}.</p>
                <p><strong>Beaches:</strong> { beach.description}</p>
              </div>
            </section>
          </div>
          <Link to="/beaches-list">Back</Link>
          <Navbar />
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

export default BeachProfile;