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

let eventId = "";

class EventProfile extends Component {
  state = {
    event: "",
    status: STATUS.LOADING,
    user: "",
  }

  componentDidMount() {
    eventId = this.props.match.params.id;
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

  handleJoinIn = (id, participant) => {
    console.log(id)
    console.log(participant)
    apiClient
    .AddRemoveParticipant(id, participant)
    .then((response) => {
      console.log("response:",response)
    })
  }

  eventProfile = () => {
    const { event } = this.state;
    const eventDate = new Date(event.date);
    const formatEventDate = `${eventDate.getDate()}-${eventDate.getMonth()}-${eventDate.getFullYear()}`

    if (event !== undefined) {
      return (
        <UserContext.Consumer>
          {({ user }) => (
            <div className="event-profile-container">
              <div>
                <img src={ event.image} alt="event"/>
                <section>
                  <h2>{ event.name}</h2>
                  <div>
                    <p><strong>Creator:</strong> <Link to={`/surfers-list/${event.owner._id}`}>{ event.owner.name } { event.owner.surname }</Link></p>
                    <p><strong>Date:</strong> { formatEventDate }.</p>
                    <p><strong>Beach:</strong> { event.beach }.</p>
                    <p><strong>Description:</strong> { event.description }.</p>
                    <div>
                      <p><strong>Participants:</strong></p>
                      <ul>
                        {event.participants.map((participant, i) => {
                          return (
                            <li key={i}>
                              <Link to={`/surfers-list/${participant._id}`}><p>{participant.name} { participant.surname }</p></Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <div>
                      <p><strong>Reviews:</strong></p>
                      <ul>
                        
                        {event.reviews.map((review, i) => {
                          const reviewDate = new Date(review.created_at);
                          const formatReviewDate = `${reviewDate.getDate()}-${reviewDate.getMonth()}-${reviewDate.getFullYear()} // ${reviewDate.getHours()}:${reviewDate.getMinutes()}:${reviewDate.getSeconds()}`
                          return (
                            <li key={i}>
                              <Link to={`/surfers-list/${review.owner._id}`}><h3><strong>{ review.owner.name } { review.owner.surname }</strong></h3></Link>
                              <p><strong>{ review.title }</strong></p>
                              <p>{ review.description }</p>
                              <p>{ formatReviewDate }</p>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <button className="event-join-button" onClick={ () => this.handleJoinIn(eventId, user.data._id) }>Join in</button>
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