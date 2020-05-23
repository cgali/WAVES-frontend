import React, { Component } from 'react';
import Loading from "../views/Loading";
import Error500 from "../views/Error500";
import EventForm from "../components/eventForm/EventForm";


import "./css/eventProfile.css";

import apiClient from "../services/apiClient";
import { Link, withRouter } from "react-router-dom";
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
    image: "",
    title: "",
    date: "",
    beach: "",
    description: "",
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
          image: response.data.event.image,
          title: response.data.event.title,
          date: response.data.event.date,
          beach: response.data.event.beach,
          description: response.data.event.description,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.name,
          status: STATUS.ERROR,
        });
      });
  }

  handleStateUpdating = () => {
    this.setState({
      updating: !this.state.updating,
    })
  }

  handleUpdate = () => {
    const { image, title, date, beach, description } = this.state;
    apiClient
      .updateEvent(eventId, { image, title, date, beach, description })
      .then(() => {
        console.log('EVENT UPDATED')
        this.props.history.push(`/events-list/${eventId}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleDelete = () => {
    const { event } = this.state;
    apiClient
      .deleteEvent(event._id)
      .then (() => {
        console.log('event deleted')
        this.props.history.push('/events-list')
      })
      .catch((error) => {
        console.log("THE ERROR IS:", error)
      })
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  eventProfile = () => {
    const { event, image, title, date, beach, description } = this.state;
    const eventDate = new Date(event.date);
    const formatEventDate = `${eventDate.getDate()}-${eventDate.getMonth()}-${eventDate.getFullYear()}`
    const formatEventTime = `${eventDate.getHours()}:${eventDate.getMinutes()}`

    if (event !== undefined) {
      return (
        <UserContext.Consumer>
          {({ user }) => (
            <div className="event-profile-container">
              <div>
                <img className="event-profile-image" src={ event.image } alt="event"/>
                <section>
                  <h2>{ event.title }</h2>
                  <div>
                    <p><strong>Created by:</strong><Link to={`/surfers-list/${event.owner._id}`}>{ event.owner.name } { event.owner.surname }.</Link></p>
                    <p><strong>Date:</strong> { formatEventDate }.</p>
                    <p><strong>Start time:</strong> { formatEventTime }.</p>
                    <p><strong>Beach:</strong> { event.beach }.</p>
                    <p><strong>Description:</strong> { event.description }</p>
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
                      <button className="event-update-button" onClick={ this.handleStateUpdating }>Update</button>
                      <button className="event-delete-button" onClick={ this.handleDelete }>Delete</button>
                    </> )}
              </div>
              { this.state.updating && (
                <EventForm onSubmit={ this.handleUpdate } image={ image } title={ title } date={ date } beach={ beach} description={ description } onChange={ this.handleChange }/>
              )}
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
        return <div><Loading /></div>;
      case STATUS.LOADED:
        return <div>
                { this.eventProfile() }
              </div>
      case STATUS.ERROR:
        return <Error500 />;
    }
  }
}

export default withRouter(EventProfile);