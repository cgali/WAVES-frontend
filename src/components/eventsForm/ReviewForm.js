import React, { Component } from 'react';

import "../eventsForm/eventUpdateForm.css";



class ReviewForm extends Component {
  render() {
    const { onSubmit, reviewTitle, reviewDescription, onChange } = this.props;
    return(
      <div className="review-form-container">
          <form className="signup-form" onSubmit={onSubmit}>
            <input
              type="text"
              name="reviewTitle"
              id="reviewTitle"
              placeholder="📣Title"
              value={ reviewTitle }
              onChange={ onChange }
            />
            <textarea
              name="reviewDescription"
              id="reviewDescription"
              placeholder="📝Description"
              rows="8" cols="25"
              value={ reviewDescription }
              onChange={ onChange }
            />
            <input className="input-button" type="submit" value="Add" />
          </form>
        </div>
    )
  }
}


export default ReviewForm;