import React, { Component } from 'react';
import Loading from "../views/Loading";
import Error500 from "../views/Error500";

import apiClient from "../services/apiClient";
import { withRouter } from "react-router-dom";

import "./css/updateProfileForm.css";



const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

class UpdateProfileForm extends Component {

state = {
  status: STATUS.LOADING,
  userData: null,
  userModified: {}
}

componentDidMount() {
  apiClient
    .profile()
    .then((response) => {
      console.log("data", response.data);
      this.setState({
        status: STATUS.LOADED,
        userData: response.data,
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
    userModified: {
      ...this.state.userModified,
      [e.target.name]: e.target.value,
    },
    userData: {
      ...this.state.userData,
      [e.target.name]: e.target.value,
    }
  });
};

handleUpdate = (e) => {
  e.preventDefault();
  const { userModified } = this.state;
  userModified.frequentsBeaches && (userModified.frequentsBeaches = userModified.frequentsBeaches.split(','))
  userModified.typeOfWaves && (userModified.typeOfWaves = userModified.typeOfWaves.split(','))
  apiClient
    .updateProfile(userModified)
    .then((res) => {
      console.log('PROFILE UPDATED', res)
      this.props.history.push('/profile')
    })
    .catch((error) => {
      console.log(error)
    });
};

renderForm = () => {
  const { image, name, surname, level, favoriteBoard, typeOfWaves, frequentsBeaches, eventUpdateNotification } = this.state.userData;
  const Background = 'https://k62.kn3.net/taringa/7/7/E/1/F/B/Nosha/550x978_1E3.jpg'
  return (
    <div className="update-profile-form-container" style={{ backgroundImage: `url(${Background})`}}>
      <div className="update-profile-form-box">
        <h2 className="update-profile-form-title">Update profile</h2>
        { eventUpdateNotification }
        <form className="update-profile-form" onSubmit={this.handleUpdate}>
          <label className="update-profile-form-label" htmlFor="image"><strong>Image:</strong></label>
          <input
            className="update-profile-form-input"
            type="text"
            name="image"
            id="image"
            placeholder="📷Image"
            value={image}
            onChange={ this.handleChange }
          />
          <label className="update-profile-form-label" htmlFor="name"><strong>Name:</strong></label>
          <input
            className="update-profile-form-input"
            type="text"
            name="name"
            id="name"
            placeholder="🏄‍♂️Name"
            value={name}
            onChange={ this.handleChange }
          />
          <label className="update-profile-form-label" htmlFor="surname"><strong>Surname:</strong></label>
          <input
            className="update-profile-form-input"
            type="text"
            name="surname"
            id="surname"
            placeholder="🤙Surname"
            value={surname}
            onChange={ this.handleChange }
          />
          <label className="update-profile-form-label" htmlFor="level"><strong>Level:</strong></label>
          <input
            className="update-profile-form-input with-paragraph"
            type="text"
            name="level"
            id="level"
            placeholder="✨Level"
            value={level}
            onChange={ this.handleChange }
          />
          <p className="update-profile-form-paragraph">(amateur, experienced, expert or professional)</p>
          <label className="update-profile-form-label" htmlFor="favoriteBoard"><strong>Favorite board:</strong></label>
          <input
            className="update-profile-form-input"
            type="text"
            name="favoriteBoard"
            id="FavoriteBoard"
            placeholder="🛹Favorite board"
            value={favoriteBoard}
            onChange={ this.handleChange }
          />
          <label className="update-profile-form-label" htmlFor="typeOfWaves"> <strong>Type of waves:</strong></label>
          <input
            className="update-profile-form-input with-paragraph"
            type="text"
            name="typeOfWaves"
            id="typeOfWaves"
            placeholder="🌊Waves"
            value={typeOfWaves}
            onChange={ this.handleChange }
          />
          <p className="update-profile-form-paragraph">(small, medium, big or super big)</p>
          <label className="update-profile-form-label" htmlFor="frequentsBeaches"><strong>Frequents beaches:</strong></label>
          <input
            className="update-profile-form-input"
            type="text"
            name="frequentsBeaches"
            id="frequentsBeaches"
            placeholder="🏖Beaches"
            value={frequentsBeaches}
            onChange={ this.handleChange }
          />
          <input className="update-profile-input-button" type="submit" value="Update" />
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

export default withRouter(UpdateProfileForm);