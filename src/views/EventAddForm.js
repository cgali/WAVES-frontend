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
    return(
      <div className="event-form-container">
        <h2 className="event-form-title">Create event</h2>
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