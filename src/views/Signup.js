import React, { Component } from 'react';
import Background from '../components/background/Background';
import "./css/signup.css";
import { Link } from 'react-router-dom';



class Signup extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    password: "",
    signupNotification: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validateEmail = (email)  => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    console.log(history);
    const { name, surname, email, password } = this.state;
    const { onSignup } = this.props;
    // if (name !== "" && surname !== "" && email !== "" && password !== "") {
    //   onSignup({ name, surname, email, password });
    // };
    if (!this.validateEmail(email)) {
      this.setState({
        signupNotification: <p className="login-form-notification">The <strong style={{ color: "#29d1d1"}}>EMAIL</strong> format isn't correct.</p>
      })
    }
  }

  render() {
    const { name, surname, email, password, signupNotification} = this.state;
    return (
      <div>
        <div className="signup-container">
          <h2 className="title">Sign up</h2>
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <input
              className="signup-input"
              type="text"
              name="name"
              id="name"
              placeholder="🏄‍♂️Name"
              value={name}
              onChange={this.handleChange}
            />
            <input
              className="signup-input"
              type="text"
              name="surname"
              id="surname"
              placeholder="🤙Surname"
              value={surname}
              onChange={this.handleChange}
            />
            <input
              className="signup-input"
              type="email"
              name="email"
              id="email"
              placeholder="📩Email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              className="signup-input"
              type="password"
              name="password"
              id="password"
              placeholder="🔐Password"
              value={password}
              onChange={this.handleChange}
            />
            { signupNotification }
            <input className="input-signup-button" type="submit" value="Register" />
          </form>
          <Link className="signup-back-button" to="/login">Back</Link>
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