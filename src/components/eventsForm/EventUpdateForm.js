import React, { Component } from 'react';

import "../eventsForm/eventUpdateForm.css";



class EventUpdateForm extends Component {
  render() {
    const { onSubmit, image, title, date, beach, description, onChange } = this.props;
    return(
      <div className="event-form-container">
          <h2 className="title">Update event</h2>
          <form className="signup-form" onSubmit={onSubmit}>
            <input
              type="text"
              name="image"
              id="image"
              value={ image }
              onChange={ onChange }
            />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="📣Title"
              value={ title }
              onChange={ onChange }
            />
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={ date }
              onChange={ onChange }
            />
            <input
              type="text"
              name="beach"
              id="beach"
              placeholder="🏖Beach"
              value={ beach }
              onChange={ onChange }
            />
            <textarea
              name="description"
              id="description"
              placeholder="📝Description"
              rows="8" cols="25"
              value={ description }
              onChange={ onChange }
            />
            <input className="input-button" type="submit" value="Update" />
          </form>
        </div>
    )
  }
}


export default EventUpdateForm;