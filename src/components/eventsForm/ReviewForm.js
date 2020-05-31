import React, { Component } from 'react';

import "../eventsForm/eventsForm.css";



class ReviewForm extends Component {
  render() {
    const { onSubmit, reviewTitle, reviewNotification, reviewDescription, onChange, buttonName, onClick } = this.props;
    return(
      <div className="review-form-container">
        <h2 className="review-form-title">Add a review</h2>
        { reviewNotification }
        <form className="review-form" onSubmit={onSubmit}>
          <input
            className="review-form-input"
            type="text"
            name="reviewTitle"
            id="reviewTitle"
            placeholder="📣Title"
            value={ reviewTitle }
            onChange={ onChange }
          />
          <textarea
            className="review-form-input"
            name="reviewDescription"
            id="reviewDescription"
            placeholder="📝Description"
            rows="8" cols="25"
            value={ reviewDescription }
            onChange={ onChange }
          />
          <div className="review-form-buttons-box">
            <input className="review-form-input-button" type="submit" value={buttonName} />
            <button className="close-review-form-button" onClick={ onClick }>Close</button>
          </div>
          
        </form>
      </div>
    )
  }
}


export default ReviewForm;