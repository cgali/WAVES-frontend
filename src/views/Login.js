import React, { Component } from "react";
import Background from '../components/background/Background';
import './css/login.css';

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;
    if (email !== "" && password !== "") {
      onLogin({ email, password });
    }
  };

  cleanForm = () => {
    this.setState({
      email: "",
      password: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <div className="login-container">
          <img className="logo-waves" src="./logos/waves-logo.png" style={{ width: '20rem' }} alt="logo letters"/>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              className="login-input"
              type="text"
              name="email"
              id="email"
              placeholder="📩Email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              className="login-input"
              type="password"
              name="password"
              id="password"
              placeholder="🔐Password"
              value={password}
              onChange={this.handleChange}
            />
            <input className="input-button" type="submit" value="Enter" />
          </form>
          <p className="link-signup">No account yet?<br/>Sign up here!</p>
          <div className="login-footer">
            <img  style={{ width: '2rem' }} src="./logos/image-logo.gif" alt=""/>
            <p>© WAVES Trademark</p>
          </div>
        </div>
        <Background />
      </div>
    );
  }
}
