import React, { Component } from 'react';
import Loading from "../views/Loading";
import Error500 from "../views/Error500";
import EventUpdateForm from "../components/eventsForm/EventUpdateForm";
import ReviewForm from "../components/eventsForm/ReviewForm";


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
    addReview: false,
    image: "",
    title: "",
    date: "",
    beach: "",
    description: "",
    reviewTitle: "",
    reviewDescription: "",
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
          reviewTitle: response.data.event.reviews.reviewTitle,
          reviewDescription: response.data.event.reviews.reviewDescription
        });
      })
      .catch((error) => {
        this.setState({
          error: error.name,
          status: STATUS.ERROR,
        });
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /******************** 
   *** UPDATE EVENT ***
   *******************/

  handleStateUpdating = () => {
    this.setState({
      updating: !this.state.updating,
      addReview: false,
      updateReview: false,
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

  /******************** 
   *** DELETE EVENT ***
   *******************/

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

  /****************** 
   *** JOIN EVENT ***
   *****************/

  handleJoinIn = (eventId, userId) => {
    console.log(eventId)
    console.log('participant', userId)
    apiClient
    .AddRemoveParticipant(eventId, { participant: userId })
    .then((response) => {
      console.log("response:",response)
    })
  }

  /****************** 
   *** ADD REVIEW ***
   *****************/

  handleStateAddReview = () => {
    this.setState({
      addReview: !this.state.addReview,
      updating: false,
      updateReview: false,
    })
  }

  handleAddReview = (e) => {
    e.preventDefault();
    const { reviewTitle, reviewDescription } = this.state;
    console.log("COMPROBACION STATE:", reviewTitle, reviewDescription)
    apiClient
      .createEventReview(eventId, { reviewDescription, reviewTitle })
      .then(() => {
        this.setState({ addReview: false })
        this.props.history.push(`/events-list/${eventId}`)
      })
      .catch((error) => {
        console.log(error)
      });
  }

   /******************** 
   *** DELETE REVIEW ***
   ********************/

  handleDeleteReview = (reviewId) => {
    apiClient
      .deleteEventReview(eventId, reviewId )
      .then (() => {
        console.log('REVIEW DELETED')
        this.props.history.push(`/events-list/${eventId}`)
      })
      .catch((error) => {
        console.log("THE ERROR IS:", error)
      })
  }


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
                <section className="event-profile-info-box">
                  <div className="event-profile-info-header">
                    <h2 className="event-profile-info-name">{ event.title }</h2>
                    { !this.state.updating && ( 
                      <div className="event-profile-header-buttons">
                        <button className="event-join-button" onClick={ () => this.handleJoinIn(event._id, user.data._id) }>Join in</button>
                        <Link className="event-profile-back-button" to="/events-list">Back</Link>
                        { user.data._id === event.owner._id && ( 
                          <div className="event-profile-owner-buttons">
                            <button className="update-event-button" onClick={ this.handleStateUpdating }>Update</button>
                            <button className="delete-event-button" onClick={ this.handleDelete }>Delete</button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  { this.state.updating && (
                    <EventUpdateForm
                      onSubmit={ this.handleUpdate } 
                      image={ image } 
                      title={ title } 
                      date={ date } 
                      beach={ beach} 
                      description={ description } 
                      onChange={ this.handleChange }
                      onClick= { this.handleStateUpdating }
                    />
                  )}
                </section>
                { !this.state.updating && (
                  <div>
                    <div className="event-profile-info-continue-box">
                      <p className="event-profile-title"><strong>Information:</strong></p>
                      <p><strong>Created by:</strong> <Link className="event-profile-info-owner" to={`/surfers-list/${event.owner._id}`}>{ event.owner.name } { event.owner.surname }.</Link></p>
                      <p><strong>Date:</strong> { formatEventDate }.</p>
                      <p><strong>Start time:</strong> { formatEventTime }.</p>
                      <p><strong>Beach:</strong> { event.beach }.</p>
                      <p><strong>Description:</strong> { event.description }</p>
                    </div>
                    <section className="event-profile-participants-box">     
                      <p className="event-profile-title"><strong>Participants:</strong></p>
                      <ul>
                        {event.participants.map((participant, index) => {
                          return (
                            <li key={`${participant.name}_${index}`}>
                              <Link className="event-profile-participants-name" to={`/surfers-list/${participant._id}`}><p>{participant.name} { participant.surname }</p></Link>
                            </li>
                          )
                        })}
                      </ul>
                    </section>
                    <section className="event-profile-reviews-box">
                      <div className="event-profile-reviews-header"> 
                        <p className="event-profile-title"><strong>Reviews:</strong></p>
                        <button className="add-review-form-button" onClick={ this.handleStateAddReview }>Comment</button>
                      </div>
                      { this.state.addReview && (
                        <ReviewForm 
                          onSubmit={ this.handleAddReview } 
                          reviewTitle={ this.state.event.reviews.title } 
                          reviewDescription={ this.state.event.reviews.description } 
                          onChange={ this.handleChange } 
                          buttonName="Send"
                          onClick={ this.handleStateAddReview }
                        />
                      )}
                      <ul className="event-profile-reviews-ul">
                        {event.reviews.map((review, index) => {
                          const reviewDate = new Date(review.created_at);
                          const formatReviewDate = `${reviewDate.getDate()}-${reviewDate.getMonth()}-${reviewDate.getFullYear()} // ${reviewDate.getHours()}:${reviewDate.getMinutes()}:${reviewDate.getSeconds()}`
                          return (
                            <li className="event-profile-single-review-box" key={`${review.owner.name}_${index}`}>
                              <p><strong>{ review.reviewTitle }</strong></p>
                              <p className="event-profile-single-review-description">{ review.reviewDescription }</p>
                              <div className="event-profile-single-review-footer">
                                <div className="event-profile-single-review-footer-by-box">
                                  <strong>By:</strong>
                                  <Link className="event-profile-single-review-owner" to={`/surfers-list/${review.owner._id}`}>
                                    <strong>{ review.owner.name } { review.owner.surname }</strong>
                                  </Link>
                                </div>
                                <p>{ formatReviewDate }</p>
                              </div>
                              { user.data._id === review.owner._id && (
                                  <button className="delete-review-button" onClick={() => this.handleDeleteReview(review._id) }>Delete</button>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </section>
                  </div>
                )}
              </div>
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