import React, { Component } from 'react';

import "../eventsForm/eventsForm.css";



class EventUpdateForm extends Component {
  render() {
    const { onSubmit, image, title, date, description, onChange } = this.props;
    return(
      <div className="event-form-update-container">
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
            <select className="select-input" name="beach" id="beach" onChange={ this.handleChange }>
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