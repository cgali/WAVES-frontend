import React, { Component } from 'react';

import apiClient from "../services/apiClient";

import "./css/eventAddForm.css";

class EventAddForm extends Component {

  state = {
    user: "",
    title: "",
    date: "",
    beach: "",
    description: "",
  }

  handleCreate = (e) => {
    e.preventDefault();
    const { user, title, date, beach, description } = this.state;
    apiClient
      .createEvent({ user, title, date, beach, description })
      .then(() => {
        
      })
      .catch((error) => {
        console.log(error)
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
  const { image, title, date, description } = this.state;
    return(
      <div className="event-form-container">
          <h2 className="title">Create event</h2>
          <form className="signup-form" onSubmit={this.handleCreate}>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="📷URL Image"
              value={ image }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="📣Title"
              value={ title }
              onChange={ this.handleChange }
            />
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={ date }
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
            />
            <input className="input-button add-event" type="submit" value="Create" />
          </form>
        </div>
    )
  }
}

export default EventAddForm;