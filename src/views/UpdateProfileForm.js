import React, { Component } from 'react';
import Loading from "../views/Loading";
import Error500 from "../views/Error500";

import apiClient from "../services/apiClient";
import { withRouter } from "react-router-dom";
import { UserContext } from '../context/UserContext';

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
  userModified: {},
  updateProfileNotification: null,
  deleteNotification: null,
}

componentDidMount() {
  this.handleUpdateProfile()
}

handleUpdateProfile = () => {
  apiClient
    .profile()
    .then((response) => {
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
  const { userModified, userData } = this.state;
  userModified.frequentsBeaches && (userModified.frequentsBeaches = userModified.frequentsBeaches.split(','))
  userModified.typeOfWaves && (userModified.typeOfWaves = userModified.typeOfWaves.split(','))
  if ((userData.name === undefined || userData.name.length === 0)
    && (userModified.name === undefined || userModified.name.length === 0)) {
    this.setState ({
      updateProfileNotification: <p className="update-profile-form-notification">The <strong style={{ color: "#14a714"}}>NAME</strong> field cannot be empty</p>,
    })
  } else if ((userData.surname === undefined || userData.surname.length === 0)
    && (userModified.surname === undefined || userModified.surname.length === 0)) {
      this.setState ({
        updateProfileNotification: <p className="update-profile-form-notification">The <strong style={{ color: "#14a714"}}>SURNAME</strong> field cannot be empty</p>,
      })
  } else if ((userData.level === undefined || userData.level === "")
    && (userModified.level === undefined || userModified.level === "")) {
      this.setState ({
        updateProfileNotification: <p className="update-profile-form-notification">The <strong style={{ color: "#14a714"}}>LEVEL</strong> field cannot be empty</p>,
      })
  } else {
      apiClient
      .updateProfile(userModified)
      .then(() => {
        this.props.history.push('/profile')
      })
      .catch((error) => {
        console.log(error)
      });
  }
};

handleDeleteProfile = (handleLogginOut) => {
  apiClient
    .deleteProfile()
    .then (() => {
      handleLogginOut()
      console.log('Im here')
    })
    .catch((error) => {
      console.log("EEEERRRRROOOOORRRR")
    })
}

handleStateDelete = () => {
  this.setState({
    deleteNotification: !this.state.deleteNotification,
  })
}

renderForm = () => {
  const { updateProfileNotification, deleteNotification } = this.state;
  const { image, name, surname, level, favoriteBoard, typeOfWaves, frequentsBeaches } = this.state.userData;
  const Background = 'https://k62.kn3.net/taringa/7/7/E/1/F/B/Nosha/550x978_1E3.jpg'

  return (
    <UserContext.Consumer>
      {({ handleLogginOut }) => (
        <div className="update-profile-form-container" style={{ backgroundImage: `url(${Background})`}}>
          
            { deleteNotification && (
              <>
              <div className="update-profile-overlay" />
              <div className="update-profile-delete-notification-box">
                <p className="update-profile-delete-text">Are you sure?</p>
                <div className="update-profile-delete-notification-buttons-box">
                  <button onClick={ () => this.handleDeleteProfile(handleLogginOut) } className="update-profile-delete-button">Delete</button>
                  <button onClick={ this.handleStateDelete } className="update-profile-back-button">Back</button>
                </div>
                <p className="update-profile-delete-final-instruction">After this, the account cannot be recovered.</p>
              </div>
              </>
            )}
          
          <div className="update-profile-form-box">
            <h2 className="update-profile-form-title">Update profile</h2>
            { updateProfileNotification }
            <form className="update-profile-form" onSubmit={this.handleUpdate}>
              <div className="update-profile-label-input-box">
                <label className="update-profile-form-label" htmlFor="image"><strong>Image:</strong></label>
                <input
                  className="update-profile-form-input with-paragraph"
                  type="text"
                  name="image"
                  id="image"
                  placeholder="  📷Image"
                  value={image}
                  onChange={ this.handleChange }
                />
                <p className="update-profile-form-paragraph">(URL of an internet image)</p>
                <label className="update-profile-form-label" htmlFor="name"><strong>Name:</strong></label>
                <input
                  className="update-profile-form-input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="  🏄‍♂️Name"
                  value={name}
                  onChange={ this.handleChange }
                />
                <label className="update-profile-form-label" htmlFor="surname"><strong>Surname:</strong></label>
                <input
                  className="update-profile-form-input"
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="  🤙Surname"
                  value={surname}
                  onChange={ this.handleChange }
                />
                <label className="update-profile-form-label" htmlFor="level"><strong>Level:</strong></label>
                <select
                  className="update-profile-form-input with-paragraph"
                  type="text"
                  name="level"
                  id="level"
                  placeholder="  ✨Level"
                  value={level}
                  onChange={ this.handleChange }
                >
                  <option value=""></option>
                  <option value="amateur">Amateur</option>
                  <option value="experienced">Experienced</option>
                  <option value="expert">Expert</option>
                  <option value="professional">Professional</option>
                </select>
                <p className="update-profile-form-paragraph">(amateur, experienced, expert or professional)</p>
                <label className="update-profile-form-label" htmlFor="favoriteBoard"><strong>Favorite board:</strong></label>
                <input
                  className="update-profile-form-input"
                  type="text"
                  name="favoriteBoard"
                  id="FavoriteBoard"
                  placeholder="  🛹Favorite board"
                  value={favoriteBoard}
                  onChange={ this.handleChange }
                />
                <label className="update-profile-form-label" htmlFor="typeOfWaves"> <strong>Type of waves:</strong></label>
                <input
                  className="update-profile-form-input with-paragraph"
                  type="text"
                  name="typeOfWaves"
                  id="typeOfWaves"
                  placeholder="  🌊Waves"
                  value={typeOfWaves}
                  onChange={ this.handleChange }
                />
                <p className="update-profile-form-paragraph">(small, medium, big or super big)</p>
                <label className="update-profile-form-label" htmlFor="frequentsBeaches"><strong>Frequents beaches:</strong></label>
                <input
                  className="update-profile-form-input with-paragraph"
                  type="text"
                  name="frequentsBeaches"
                  id="frequentsBeaches"
                  placeholder="  🏖Beaches"
                  value={frequentsBeaches}
                  onChange={ this.handleChange }
                />
                <p className="update-profile-form-paragraph">(Ex: Barceloneta, El Masnou, Sitges...)</p>
              </div>
              { !deleteNotification && (
                <div className="update-profile-buttons-box">
                  <input className="update-profile-input-button" type="submit" value="Update" />
                  <button onClick={ this.handleStateDelete } className="update-profile-delete-button">Delete</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </UserContext.Consumer>
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