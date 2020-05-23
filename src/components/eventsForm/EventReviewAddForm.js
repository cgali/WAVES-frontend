import React, { Component } from 'react';

import "../eventsForm/eventUpdateForm.css";



class EventReviewAddForm extends Component {
  render() {
    const { onSubmit, reviewTitle, reviewDescription, onChange } = this.props;
    return(
      <div className="event-form-container">
          <h2 className="title">Add a review</h2>
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


export default EventReviewAddForm;