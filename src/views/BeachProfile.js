import React, { Component } from 'react';
import Error500 from "../views/Error500";
import Loading from "../views/Loading";
import ReviewForm from "../components/eventsForm/ReviewForm";
import Rating from "../components/rating/Rating";
import RateForm from '../components/rateForm/RateForm';

import "./css/beachProfile.css";

import apiClient from "../services/apiClient";
import { Link, withRouter } from "react-router-dom";
import { UserContext } from '../context/UserContext';




const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

let beachId = "";

class BeachProfile extends Component {
  state = {
    status: STATUS.LOADING,
    beach: "",
    addReview: false,
    addRate: false,
    reviewTitle: "",
    reviewDescription: "",
    waveRate: "",
    backgroundRate: "",
    socialEnvironmentRate: "",


  }

  componentDidMount() {
    beachId = this.props.match.params.id;
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /*****************
  *** ADD REVIEW ***
  *****************/

  handleStateAddReview = () => {
    this.setState({
      addReview: !this.state.addReview,
      updateReview: false,
      addRate: false,
    })
  }

  handleAddReview = (e) => {
    e.preventDefault();
    const { reviewTitle, reviewDescription } = this.state;
    console.log("COMPROBACION STATE:", reviewTitle, reviewDescription)
    apiClient
      .createBeachReview(beachId, { reviewDescription, reviewTitle })
      .then(() => {
        this.setState({ addReview: false })
        this.props.history.push(`/beaches-list/${beachId}`)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  /******************** 
  *** DELETE REVIEW ***
  ********************/

 deleteBeachRate = (reviewId) => {
    apiClient
      .deleteBeachReview(beachId, reviewId )
      .then (() => {
        console.log('REVIEW DELETED')
        this.props.history.push(`/beaches-list/${beachId}`)
      })
      .catch((error) => {
        console.log("THE ERROR IS:", error)
      })
  }

  /*****************
  *** ADD RATE ***
  *****************/

  handleStateAddRate = () => {
    this.setState({
    addRate: !this.state.addRate,
    addReview: false,
    updateReview: false,
   })
  }

  handleAddRate = (e => {
  e.preventDefault();
  const { waveRate, backgroundRate, socialEnvironmentRate } = this.state;
  apiClient
    .createBeachRate(beachId, {waveRate, backgroundRate, socialEnvironmentRate })
    .then(() => {
      this.setState({ addRate: false })
      this.props.history.push(`/beaches-list/${beachId}`)
    })
    .catch((error) => {
      console.log(error)
    });
  })

   /******************** 
   *** DELETE REVIEW ***
   ********************/

  handleDeleteRate = (rateId) => {
    apiClient
      .deleteBeachRate(beachId, rateId )
      .then (() => {
        console.log('RATE DELETED')
        this.props.history.push(`/beaches-list/${beachId}`)
      })
      .catch((error) => {
        console.log("THE ERROR IS:", error)
      })
  }


  beachProfile = () => {
    const { beach } = this.state;

    if (beach !== undefined) {
      return(
        <UserContext.Consumer>
          {({ user }) => (
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
                    <p><strong>Description:</strong> { beach.description}</p>
                  </div>
                  <section>
                  <p><strong>Rates:</strong></p>
                  <ul>
                    <li>Waves:<Rating>3</Rating></li>
                    <li>Background:<Rating>4</Rating></li>
                    <li>Social environment:<Rating>5</Rating></li>
                  </ul>
                  <button className="add-rate-button" onClick={ this.handleStateAddRate }>Rate</button>
                  { this.state.addRate && (
                      <>
                        <h2 className="title">Add a rate</h2>
                        <RateForm 
                          onSubmit={ this.handleAddRate } 
                          waveRate={ beach.rate.waveRate } 
                          backgroundRate={ beach.rate.backgroundRate }
                          socialEnvironmentRate= { beach.rate.socialEnvironment }
                          onChange={ this.handleChange } 
                          buttonName="Rate"
                        />
                      </>
                    )}
                  </section>
                  {beach.rate.map((rate, index) => {
                    console.log("USER:", user.data._id, "OWNER:", rate.owner)
                    return(
                      user.data._id === rate.owner && (<button key={`${rate.owner.name}_${index}`} onClick={ () => this.handleDeleteRate(rate._id)}>Delete</button>)
                      
                    )

                  })}
                  <section>
                    <div>
                      <div>
                        <p><strong>Reviews:</strong></p>
                        <ul>
                          {beach.reviews.map((review, index) => {
                            const reviewDate = new Date(review.created_at);
                            const formatReviewDate = `${reviewDate.getDate()}-${reviewDate.getMonth()}-${reviewDate.getFullYear()} // ${reviewDate.getHours()}:${reviewDate.getMinutes()}:${reviewDate.getSeconds()}`
                            return (
                              <li key={`${review.owner.name}_${index}`}>
                                <Link to={`/surfers-list/${review.owner._id}`}><h3><strong>{ review.owner.name } { review.owner.surname }</strong></h3></Link>
                                <p><strong>{ review.reviewTitle }</strong></p>
                                <p>{ review.reviewDescription }</p>
                                <p>{ formatReviewDate }</p>
                                { user.data._id === review.owner._id && (
                                    <button className="delete-review-button" onClick={() => this.handleDeleteReview(review._id) }>Delete</button>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                      <button className="add-review-form-button" onClick={ this.handleStateAddReview }>Comment</button>
                    </div>
                    { this.state.addReview && (
                      <>
                        <h2 className="title">Add a review</h2>
                        <ReviewForm 
                          onSubmit={ this.handleAddReview } 
                          reviewTitle={ beach.reviews.title } 
                          reviewDescription={ beach.reviews.description } 
                          onChange={ this.handleChange } 
                          buttonName="Add"
                        />
                      </>
                    )}
                  </section>
                </section>
              </div>
              <Link to="/beaches-list">Back</Link>
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
        return <div className="beach-profile-container">
                { this.beachProfile() }
              </div>
      case STATUS.ERROR:
        return <Error500 />;
    }
  }
}

export default withRouter(BeachProfile);