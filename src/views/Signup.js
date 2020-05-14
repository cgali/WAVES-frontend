import React, { Component } from 'react';
import Background from '../components/background/Background';
import "./css/signup.css";
import apiClient from "../services/apiClient";



class Signup extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { name, surname, email, password } = this.state;
    apiClient
      .signUp({ name, surname, email, password })
      .then(() => {
        history.push("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { name, surname, email, password} = this.state;
    return(
      <div>
        <div className="signup-container">
          <h2 className="title">Sign up</h2>
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="🏄‍♂️Name"
              value={name}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="surname"
              id="surname"
              placeholder="🤙Surname"
              value={surname}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="📩Email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="🔐Password"
              value={password}
              onChange={this.handleChange}
            />
            <input className="input-button" type="submit" value="Submit" />
          </form>
          <div className="signup-footer">
            <img  style={{ width: '2rem' }} src="./logos/image-logo.gif" alt=""/>
            <p>© WAVES Trademark</p>
          </div>
        </div>
        <Background />
      </div>
    )
  }
}

export default Signup;