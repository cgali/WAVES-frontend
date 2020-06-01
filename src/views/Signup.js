import React, { Component } from 'react';
import Background from '../components/background/Background';

import "./css/signup.css";

import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';




class Signup extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    password: "",
    image: "../surfers/standard.png",
    signupNotification: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAppState = () => {
    const { handleAppStateNotification } = this.props;
    handleAppStateNotification()
  }

  validateEmail = (email)  => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

   validatePassword = (password) => {
    if (password.length < 6) {
        return("short");
    } else if (password.length > 30) {
        return("long");
    } else if (password.search(/\d/) === -1) {
        return("no_num");
    } else if (password.search(/[a-zA-Z]/) === -1) {
        return("no_letter");
    } else if (password.search(/[^a-zA-Z0-9\\!\\@\\#\\$\\¢\\€\\∫\\œ\\®\\†\\¥\\ø\\π\\å\\∂\\ƒ\\\\™\\¶\\§\\~\\≤\\∑\\√\\ß\\µ\\„\\,\\…\\%\\^\\&\\*\\(\\)\\_\\+]/) !== -1) {
        return("bad_char");
    }
    return("ok");
}

  handleSubmit = (e) => {
    e.preventDefault();
    const { image, name, surname, email, password } = this.state;
    const { onSignup } = this.props;
    this.setState({signupNotification: null})
    if (name === undefined || name === "") {
      this.setState({
        signupNotification: <p className="signup-form-notification">The <strong style={{ color: "#29d1d1"}}>NAME</strong> field cannot be empty.</p>
      })
    } else if (surname === undefined || surname === "") {
        this.setState({
          signupNotification: <p className="signup-form-notification">The <strong style={{ color: "#29d1d1"}}>SURNAME</strong> field cannot be empty.</p>
        })
    } else if (email === undefined || email === "") {
      this.setState({
        signupNotification: <p className="signup-form-notification">The <strong style={{ color: "#29d1d1"}}>EMAIL</strong> field cannot be empty.</p>
      })
    } else if (!this.validateEmail(email)) {
        this.setState({
          signupNotification: <p className="signup-form-notification">The <strong style={{ color: "#29d1d1"}}>EMAIL</strong> format isn't correct.</p>
        })
    } else if (password === undefined || password === "") {
      this.setState({
        signupNotification: <p className="signup-form-notification">The <strong style={{ color: "#29d1d1"}}>PASSWORD</strong> field cannot be empty.</p>
      })
    } else if (this.validatePassword(password) === "short") {
      this.setState({
        signupNotification: <p className="signup-form-notification">The <strong style={{ color: "#29d1d1"}}>PASSWORD</strong> must have at least 6 characters.</p>
      })
    } else if (this.validatePassword(password) === "no_num") {
      this.setState({
        signupNotification: <p className="signup-form-notification">The <strong style={{ color: "#29d1d1"}}>PASSWORD</strong> must have a number.</p>
      })
    } else if (this.validatePassword(password) === "no_letter") {
      this.setState({
        signupNotification: <p className="signup-form-notification">The <strong style={{ color: "#29d1d1"}}>PASSWORD</strong> must have a letter.</p>
      })
    } else if (this.validatePassword(password) === "bad_char") {
      this.setState({
        signupNotification: <p className="signup-form-notification">The <strong style={{ color: "#29d1d1"}}>PASSWORD</strong> have invalid characters.</p>
      })
    } else {
        onSignup({ image, name, surname, email, password });
    }
  }

  render() {
    const { name, surname, email, password, signupNotification} = this.state;
    return (
      <UserContext.Consumer>
        {({ appSignupNotification }) => (
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
                  type="text"
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
                { !signupNotification && ( appSignupNotification )  }
                { signupNotification }
                <input className="input-signup-button" type="submit" value="Register" />
              </form>
              <Link onClick={this.handleAppState} className="signup-back-button" to="/login">Back</Link>
              <div className="signup-footer">
                <img  style={{ width: '2rem' }} src="./logos/image-logo.png" alt=""/>
                <p>© WAVES Trademark</p>
              </div>
            </div>
            <Background />
          </div>
        )}
      </UserContext.Consumer>
    )
  }
}

export default Signup;