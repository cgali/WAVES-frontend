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
    updateReview: false,
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
    console.log('COMPROBACION:', this.state.reviewTitle)
  };

  /******************** 
   *** UPDATE EVENT ***
   *******************/

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
   *** UPDATE REVIEW ***
   ********************/

  handleStateUpdateReview = () => {
    this.setState({
      updateReview: !this.state.updateReview,
    })
  }

  handleUpdateReview = (reviewId) => {
    const { reviewDescription, reviewTitle } = this.state;
    apiClient
      .updateEventReview(eventId, reviewId, { reviewTitle, reviewDescription })
      .then(() => {
        console.log('EVENT UPDATED')
        this.props.history.push(`/events-list/${eventId}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

   /******************** 
   *** DELETE REVIEW ***
   ********************/

  handleDeleteReview = (reviewId) => {
    const { event } = this.state;
    apiClient
      .deleteEventReview(event._id, reviewId )
      .then (() => {
        console.log('event deleted')
        this.props.history.push(`/events-list/${event._id}`)
      })
      .catch((error) => {
        console.log("THE ERROR IS:", error)
      })
  }


  eventProfile = () => {
    const { event, image, title, date, beach, description, reviewTitle, reviewDescription } = this.state;
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
                              <p><strong>{ review.reviewTitle }</strong></p>
                              <p>{ review.reviewDescription }</p>
                              <p>{ formatReviewDate }</p>
                              { user.data._id === review.owner._id && (
                                <div>
                                  <button className="update-review-button" onClick={ this.handleStateUpdateReview }>Update</button>
                                  <button className="delete-review-button" onClick={() => this.handleDeleteReview(review._id) }>Delete</button>
                                </div>
                              )}
                              { this.state.updateReview && (
                                <>
                                <h2 className="title">Update the review</h2>
                                <ReviewForm onSubmit={() => this.handleUpdateReview(review._id) } reviewTitle={ reviewTitle } reviewDescription={ reviewDescription } onChange={ this.handleChange }/>
                                </>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <button className="add-review-form-button" onClick={ this.handleStateAddReview }>Comment</button>
                    <button className="event-join-button" onClick={ () => this.handleJoinIn(event._id, user.data._id) }>Join in</button>
                  </div>
                </section>
                { user.data._id === event.owner._id && ( 
                    <>
                      <button className="update-event-button" onClick={ this.handleStateUpdating }>Update</button>
                      <button className="delete-event-button" onClick={ this.handleDelete }>Delete</button>
                    </> )}
              </div>
              { this.state.updating && (
                <EventUpdateForm onSubmit={ this.handleUpdate } image={ image } title={ title } date={ date } beach={ beach} description={ description } onChange={ this.handleChange }/>
              )}
              { this.state.addReview && (
                <>
                <h2 className="title">Add a review</h2>
                <ReviewForm onSubmit={ this.handleAddReview } reviewTitle={ this.state.event.reviews.title } reviewDescription={ this.state.event.reviews.Description } onChange={ this.handleChange }/>
                </>
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