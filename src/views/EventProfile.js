import React, { Component } from 'react';
import Error500 from "../views/Error500";


import "./css/eventProfile.css";

import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";
import { UserContext } from '../context/UserContext';



const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

class EventProfile extends Component {
  state = {
    event: "",
    status: STATUS.LOADING,
  }

  componentDidMount() {
    let eventId = this.props.match.params.id;
    apiClient
      .eventProfile(eventId)
      .then((response) => {
        console.log("data:", response);
        this.setState({
          event: response.data.event,
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

  handleJoinIn = (id) => {
    console.log("working")
    apiClient
    .AddRemoveParticipant(id)
    .then((response) => {
      console.log("response:",response)
    })
  }

  eventProfile = () => {
    const { event } = this.state;
    const eventDate = new Date(event.date);
    const formatDate = `${eventDate.getDate()} - ${eventDate.getMonth()} - ${eventDate.getFullYear()}`

    if (event !== undefined) {
      return(
        <UserContext.Consumer>
          {({ user }) => (
            <div className="event-profile-container">
              <div>
                <img src={ event.image} alt="event"/>
                <section>
                  <h2>{ event.name}</h2>
                  <div>
                    <p><strong>Date:</strong> { formatDate }.</p>
                    <p><strong>Beach:</strong> { event.beach }.</p>
                    <p><strong>Description:</strong> { event.description }.</p>
                    <div>
                      <p><strong>Participants:</strong></p>
                      <ul>
                        {event.participants.map((participant, i) => {
                          return (
                            <li key={i}>
                              <p>{participant}</p>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <button className="event-join-button" onClick={() => this.handleJoinIn(user.data._id) }>Join in</button>
                  </div>
                </section>
              </div>
              <Link to="/events-list">Back</Link>
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
        return <div>{ status }</div>;
      case STATUS.LOADED:
        return <div>
                { this.eventProfile() }
              </div>
      case STATUS.ERROR:
        return <Error500 />;
    }
  }
}

export default EventProfile;