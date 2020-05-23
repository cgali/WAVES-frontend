import React, { Component } from 'react';
import Loading from "../views/Loading";
import Error500 from "../views/Error500";

import apiClient from "../services/apiClient";



const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

class UpdateProfileForm extends Component {

state = {
  status: STATUS.LOADING,
  image: "",
  name: "",
  surname: "",
  level: "",
  favoriteBoard: "",
  waves: [],
  beaches: [],
}

componentDidMount() {
  apiClient
    .profile()
    .then((response) => {
      console.log("data", response.data);
      this.setState({
        image: response.data.image,
        name: response.data.name,
        surname: response.data.surname,
        level: response.data.level,
        favoriteBoard: response.data.favoriteBoard,
        waves: response.data.waves,
        beaches: response.data.beaches,
        status: STATUS.LOADED,
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
    [e.target.name]: e.target.value,
  });
};

handleUpdate = (e) => {
  e.preventDefault();
  const { image, name, surname, level, favoriteBoard, waves, beaches } = this.state;
  apiClient
    .updateProfile({ image, name, surname, level, favoriteBoard, waves, beaches })
    .then(() => {
      this.props.history.push('/profile')
    })
    .catch((error) => {
      console.log(error)
    });
};

renderForm = () => {
  const { image, name, surname, level, favoriteBoard, waves, beaches } = this.state;
  return (
    <div>
      <h2 className="profile-form-title">Update profile</h2>
      <form className="signup-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="image"
          id="image"
          placeholder="📷Image"
          value={image}
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="🏄‍♂️Name"
          value={name}
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="surname"
          id="surname"
          placeholder="🤙Surname"
          value={surname}
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="level"
          id="level"
          placeholder="✨Level"
          value={level}
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="favoriteBoard"
          id="FavoriteBoard"
          placeholder="🛹Favorite board"
          value={favoriteBoard}
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="waves"
          id="waves"
          placeholder="🌊Waves"
          value={waves}
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="beaches"
          id="beaches"
          placeholder="🏖Beaches"
          value={beaches}
          onChange={ this.handleChange }
        />
        <input className="input-button" type="submit" value="Update" />
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

export default UpdateProfileForm;