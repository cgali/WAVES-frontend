import React, { Component } from 'react';

import "../eventsForm/eventsForm.css";



class EventUpdateForm extends Component {
  render() {
    const { onSubmit, image, title, date, beach, description, onChange, onClick } = this.props;
    return(
      <div className="event-form-update-container">
          <h2 className="event-form-update-title">Update event</h2>
          <form className="event-update-form" onSubmit={onSubmit}>
            <input
              className="event-update-input-image"
              type="text"
              name="image"
              id="image"
              value={ image }
              onChange={ onChange }
            />
            <input
              className="event-update-input"
              type="text"
              name="title"
              id="title"
              placeholder="📣Title"
              value={ title }
              onChange={ onChange }
            />
            <input
              className="event-update-input"
              type="datetime-local"
              name="date"
              id="date"
              value={ date }
              onChange={ onChange }
            />
            <select className="event-update-select-input" name="beach" id="beach" value={ beach } onChange={ onChange }>
              <option value="Barceloneta">Barceloneta</option>
              <option value="Cabrera de Mar">Cabrera de Mar</option>
              <option value="El Masnou">El Masnou</option>
              <option value="Montgat">Montgat</option>
              <option value="Ocata">Ocata</option>
              <option value="Palamós">Palamós</option>
              <option value="Salou">Salou</option>
              <option value="Sitges">Sitges</option>
              <option value="Vilassar de Mar">Vilassar de Mar</option>
            </select>
            <textarea
              className="event-update-textarea-input"
              name="description"
              id="description"
              placeholder="📝Description"
              rows="8" cols="25"
              value={ description }
              onChange={ onChange }
            />
            <div className="review-form-buttons-box">
              <input className="event-form-update-input-button" type="submit" value="Update" />
              <button className="event-form-update-back-button" onClick={ onClick }>Back</button>
            </div>
          </form>
        </div>
    )
  }
}


export default EventUpdateForm;