import React, { Component } from 'react';
import Loading from "../views/Loading";
import Error500 from "../views/Error500";
import { withRouter } from "react-router-dom";

import apiClient from "../services/apiClient";

import "./css/eventAddForm.css";



const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

class EventAddForm extends Component {

  state = {
    status: STATUS.LOADING,
    user: "",
    image: "",
    title: "",
    date: "",
    beach: "",
    description: "",
  }

  componentDidMount() {
    this.setState({ status: STATUS.LOADED, })
  }

  handleCreate = (e) => {
    e.preventDefault();
    const { user, image, title, date, beach, description } = this.state;
    apiClient
      .createEvent({ user, image, title, date, beach, description })
      .then(() => {
        this.props.history.push('/events-list')
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

  renderForm = () => {
    const { image, title, date, description } = this.state;
    const Background = 'https://k62.kn3.net/taringa/5/5/D/B/2/A/Nosha/550x977_957.jpg';
    
    return(
      <div className="add-event-form-container" style={{ backgroundImage: `url(${Background})`}}>
        <div className="add-event-form-box">
          <h2 className="add-event-form-title">Create event</h2>
          <form className="add-event-form" onSubmit={this.handleCreate}>
            <label className="add-event-form-label" htmlFor="image"><strong>Image:</strong></label>
            <input
              className="add-event-form-input"
              type="text"
              name="image"
              id="image"
              placeholder="📷URL Image"
              value={ image }
              onChange={ this.handleChange }
            />
            <label className="add-event-form-label" htmlFor="title"><strong>Title:</strong></label>
            <input
              className="add-event-form-input"
              type="text"
              name="title"
              id="title"
              placeholder="📣Title"
              value={ title }
              onChange={ this.handleChange }
            />
            <label className="add-event-form-label" htmlFor="date"><strong>Date:</strong></label>
            <input
              className="add-event-form-input"
              type="datetime-local"
              name="date"
              id="date"
              value={ date }
              onChange={ this.handleChange }
            />
            <label className="add-event-form-label" htmlFor="beach"><strong>Beach:</strong></label>
            <select className="add-event-form-select-input" name="beach" id="beach" onChange={ this.handleChange }>
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
            <label className="add-event-form-label" htmlFor="description"><strong>Description:</strong></label>
            <textarea
              className="add-event-form-textarea-input"
              name="description"
              id="description"
              placeholder="📝Description"
              rows="8" cols="25"
              value={ description }
              onChange={ this.handleChange }
            />
            <input className="add-event-input-button" type="submit" value="Create" />
          </form>
        </div>
       
      </div>
    )
  }

  render() {
    const { status } = this.state;

    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
        return <div><Loading /></div>;
      case STATUS.LOADED:
        return <div>
                { this.renderForm() }
              </div>
      case STATUS.ERROR:
        return <Error500 />;
    }
  }
}

export default withRouter(EventAddForm);