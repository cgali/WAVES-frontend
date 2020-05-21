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
    updating: false,
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

  handleJoinIn = (eventId, userId) => {
    console.log(eventId)
    console.log('participant', userId)
    apiClient
    .AddRemoveParticipant(eventId, { participant: userId })
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
                    <p><strong>Created by:</strong> <Link to={`/surfers-list/${event.owner._id}`}>{ event.owner.name } { event.owner.surname }</Link></p>
                    <p><strong>Date:</strong> { formatEventDate }.</p>
                    <p><strong>Beach:</strong> { event.beach }.</p>
                    <p><strong>Description:</strong> { event.description }.</p>
                    <div>
                      <p><strong>Participants:</strong></p>
                      <ul>
                        {event.participants.map((participant, index) => {
                          return (
                            <li key={`${participant.name}_${index}`}>
                              <Link to={`/surfers-list/${participant._id}`}><p>{participant.name} { participant.surname }</p></Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </section>
                <section>
                  <div>
                    <div>
                      <p><strong>Reviews:</strong></p>
                      <ul>
                        
                        {event.reviews.map((review, index) => {
                          const reviewDate = new Date(review.created_at);
                          const formatReviewDate = `${reviewDate.getDate()}-${reviewDate.getMonth()}-${reviewDate.getFullYear()} // ${reviewDate.getHours()}:${reviewDate.getMinutes()}:${reviewDate.getSeconds()}`
                          return (
                            <li key={`${review.owner.name}_${index}`}>
                              <Link to={`/surfers-list/${review.owner._id}`}><h3><strong>{ review.owner.name } { review.owner.surname }</strong></h3></Link>
                              <p><strong>{ review.title }</strong></p>
                              <p>{ review.description }</p>
                              <p>{ formatReviewDate }</p>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <button className="event-join-button" onClick={ () => this.handleJoinIn(event._id, user.data._id) }>Join in</button>
                  </div>
                </section>
                { user.data._id === event.owner._id && ( 
                    <>
                      <button className="event-update-button" onClick="">Update</button>
                      <button className="event-delete-button" onClick="">Delete</button>
                    </> )}
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