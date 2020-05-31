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

class BeachProfile extends Component {
  
  state = {
    status: STATUS.LOADING,
    beach: "",
    addReview: false,
    addRate: false,
    reviewTitle: "",
    reviewDescription: "",
    waveRate: undefined,
    backgroundRate: undefined,
    socialEnvironmentRate: undefined,
    reviewNotification: null,
    rateNotification: null,
  }

  componentDidMount() {
    const beachId = this.props.match.params.id;
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

  /***************
  *** ADD RATE ***
  ***************/

  handleStateAddRate = () => {
    this.setState({
    addRate: !this.state.addRate,
    addReview: false,
    updateReview: false,
    rateNotification: null,
    waveRate: undefined,
    backgroundRate: undefined,
    socialEnvironmentRate: undefined,
   })
  }

  handleAddRate = (e => {
    e.preventDefault();
    const beachId = this.props.match.params.id;
    const { waveRate, backgroundRate, socialEnvironmentRate } = this.state;
    if (waveRate === undefined || waveRate === "") {
      this.setState({
        rateNotification: <p className="rate-form-notification">The <strong style={{ color: "#14a714"}}>WAVES</strong> field cannot be empty</p>,
      }) 
    } else if (backgroundRate === undefined || backgroundRate === "") {
        this.setState({
          rateNotification: <p className="rate-form-notification">The <strong style={{ color: "#14a714"}}>BACKGROUND</strong> field cannot be empty</p>,
        }) 
    } else if ( socialEnvironmentRate === undefined || socialEnvironmentRate === "") {
      this.setState({
        rateNotification: <p className="rate-form-notification">The <strong style={{ color: "#14a714"}}>SOCIAL ENVIRONMENT</strong> field cannot be empty</p>,
      }) 
    } else {
      this.setState({ status: STATUS.LOADING })
      apiClient
        .createBeachRate(beachId, {waveRate, backgroundRate, socialEnvironmentRate })
        .then((response) => {
          this.setState({ 
            addRate: false,
            rateNotification: null,
            beach: {
              ...this.state.beach,
              rate: response.data.rate
            },
            status: STATUS.LOADED
          })
          console.log('RATE ADDED', response.data)
        })
        .catch((error) => {
          this.setState({ status: STATUS.ERROR })
          console.log(error)
        });
    }
  })
  

  /******************** 
  *** DELETE RATE ***
  ********************/

  handleDeleteRate = (rateId) => {
    const beachId = this.props.match.params.id;
    this.setState({ status: STATUS.LOADING })
    apiClient
      .deleteBeachRate(beachId, rateId)
      .then ((response) => {
        this.setState({
          addRate: false,
          beach: {
            ...this.state.beach,
            rate: response.data.rate
          },
          status: STATUS.LOADED
        })
        console.log('RATE DELETED', response.data)
      })
      .catch((error) => {
        console.log("THE ERROR IS:", error)
      })
  }

  /*********************
  *** CALCULATE RATE ***
  *********************/

  calcRate = item => this.state.beach.rate.reduce((acc, rate) => acc + rate[item], 0) / this.state.beach.rate.length

  /*****************
  *** ADD REVIEW ***
  *****************/

  handleStateAddReview = () => {
    this.setState({
      addReview: !this.state.addReview,
      updateReview: false,
      addRate: false,
      reviewNotification: null,
      reviewDescription: "",
      reviewTitle: "",
    })
  }

  handleAddReview = (e) => {
    e.preventDefault();
    const beachId = this.props.match.params.id;
    const { reviewTitle, reviewDescription } = this.state;
    if(reviewTitle === undefined || reviewTitle.length === 0 ) {
      this.setState({
        reviewNotification: <p className="review-form-notification">The <strong style={{ color: "#14a714"}}>TITLE</strong> field cannot be empty</p>,
      })
    } else if (reviewDescription === undefined || reviewDescription.length === 0) {
        this.setState({
          reviewNotification: <p className="review-form-notification">The <strong style={{ color: "#14a714"}}>DESCRIPTION</strong> field cannot be empty</p>,
        })
    } else {
        this.setState({ status: STATUS.LOADING })
        apiClient
          .createBeachReview(beachId, { reviewDescription, reviewTitle })
          .then((response) => {
            this.setState({ 
              addReview: false,
              reviewNotification: null,
              beach: {
                ...this.state.beach,
                reviews: response.data.reviews
              },
              reviewDescription: "",
              reviewTitle: "",
              status: STATUS.LOADED
            })
            console.log('REVIEW ADDED:', response)
          })
        .catch((error) => {
          this.setState({ status: STATUS.ERROR })
          console.log(error)
        });
    }
  }

  /******************** 
  *** DELETE REVIEW ***
  ********************/

  handleDeleteReview = (reviewId) => {
    const beachId = this.props.match.params.id;
    this.setState({ status: STATUS.LOADING })
    apiClient
      .deleteBeachReview(beachId, reviewId )
      .then ((response) => {
        this.setState({
          beach: {
            ...this.state.beach,
            reviews: response.data.reviews
          },
          status: STATUS.LOADED
        })
        console.log('REVIEW DELETED:', response)
      })
      .catch((error) => {
        this.setState({ status: STATUS.ERROR })
        console.log("THE ERROR IS:", error)
      })
  }

  /*****************************
  *** BEACH PROFILE FUNCTION ***
  *****************************/

  beachProfile = () => {
    const { beach, reviewNotification, rateNotification } = this.state;

    if (beach) {
      return(
        <UserContext.Consumer>
          {({ user }) => (
            <div className="beach-profile-container">
              <img className="beach-profile-image" src={ beach.image} alt="beach"/>
              <div className="beach-profile-info-box">
                <div className="beach-profile-info-header">
                  <h2 className="beach-profile-info-name">{ beach.name}</h2>
                  <Link className="beach-profile-back-button" to="/beaches-list">Back</Link>
                </div>
                <h2 className="beach-profile-info-title">Features</h2>
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
              <section className="beach-profile-rate-box">
                <h2 className="beach-profile-info-title">Rates:</h2>
                <ul>
                  <li>Waves:<Rating>{this.calcRate('waveRate')}</Rating></li>
                  <li>Background:<Rating>{this.calcRate('backgroundRate')}</Rating></li>
                  <li>Social environment:<Rating>{this.calcRate('socialEnvironmentRate')}</Rating></li>
                </ul>
                { !this.state.addRate && (
                <button className="add-rate-button" onClick={ this.handleStateAddRate }>Rate</button>
                )}
                { this.state.addRate && (
                  <>
                    <RateForm 
                      onSubmit={ this.handleAddRate }
                      rateNotification= { rateNotification }
                      waveRate={ beach.rate.waveRate } 
                      backgroundRate={ beach.rate.backgroundRate }
                      socialEnvironmentRate= { beach.rate.socialEnvironment }
                      onChange={ this.handleChange } 
                      buttonName="Rate"
                      onClick={ this.handleStateAddRate }
                    />
                    {beach.rate.map((rate, index) => {
                      console.log("wave:", this.state.waveRate, "background:", this.state.backgroundRate, "social:", this.state.socialEnvironmentRate)
                      return(
                        user.data._id === rate.owner && (<button className="delete-rate-button" key={`${rate.owner.name}_${index}`} onClick={ () => this.handleDeleteRate(rate._id)}>Delete</button>)
                        )
                      })}
                  </>
                )}
              </section>
              <section className="beach-profile-reviews-box">
                <div className="beach-profile-reviews-header">
                  <h2 className="beach-profile-info-title">Reviews:</h2>
                  { !this.state.addReview && (
                    <button className="add-review-button" onClick={ this.handleStateAddReview }>Comment</button>
                  )}
                </div>
                { this.state.addReview && (
                    <ReviewForm 
                      onSubmit={ this.handleAddReview } 
                      reviewTitle={ beach.reviews.title }
                      reviewNotification={ reviewNotification }
                      reviewDescription={ beach.reviews.description } 
                      onChange={ this.handleChange } 
                      buttonName="Send"
                      onClick={ this.handleStateAddReview }
                    />
                )}
                <ul className="beach-profile-reviews-ul">
                  { beach.reviews.map((review, index) => {
                    const reviewDate = new Date(review.created_at);
                    const formatReviewDate = `${reviewDate.getDate()}-${reviewDate.getMonth()}-${reviewDate.getFullYear()} // ${reviewDate.getHours()}:${reviewDate.getMinutes()}:${reviewDate.getSeconds()}`
                    return (
                      <li className="beach-profile-single-review-box" key={`${review.owner.name}_${index}`}>
                        <p><strong>{ review.reviewTitle }</strong></p>
                        <p className="beach-profile-single-review-description">{ review.reviewDescription }</p>
                        <div className="beach-profile-single-review-footer">
                          <p className="beach-profile-single-review-footer-by-box">
                            <strong>By:</strong>
                            <Link className="beach-profile-single-review-owner" to={`/surfers-list/${review.owner._id}`}>
                                <strong>{ review.owner.name } { review.owner.surname }</strong>
                            </Link>
                          </p>
                          <p>{ formatReviewDate }</p>
                        </div>
                        { user.data._id === review.owner._id && (
                          <button className="delete-review-button" onClick={ () => this.handleDeleteReview(review._id) }>Delete</button>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </section>
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