import React, { Component } from "react";
import Background from '../components/background/Background';

import './css/login.css';

import { Link } from "react-router-dom";
import { UserContext } from '../context/UserContext';



class Login extends Component {

  state = {
    email: "",
    password: "",
    loginNotification: null,
    appLoginNotification: this.props.loginNotification,
  };

  validateEmail = (email)  => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;
    if (email === "") {
      this.setState({
        loginNotification: <p className="login-form-notification">The <strong style={{ color: "#29d1d1"}}>EMAIL</strong> field cannot be empty</p>
      })
    } else if (!this.validateEmail(email)) {
      this.setState({
        loginNotification: <p className="login-form-notification">The <strong style={{ color: "#29d1d1"}}>EMAIL</strong> format is incorrect.</p>
      })
      this.cleanForm();
    } else if (password === "") {
        this.setState({
          loginNotification: <p className="login-form-notification">The <strong style={{ color: "#29d1d1"}}>PASSWORD</strong> field cannot be empty</p>
        })
    } else {
        this.setState({
          loginNotification: null,
        })
        onLogin({ email, password });
        this.cleanForm();
    }
  };

  cleanForm = () => {
    this.setState({
      email: "",
      password: "",
    });
  };

  handleAppState = () => {
    const { handleAppStateNotification } = this.props;
    handleAppStateNotification()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, loginNotification } = this.state;

    return (
      <UserContext.Consumer>
        {({ appLoginNotification }) => (
          <div>
            <div className="login-container">
              <img className="logo-letters" src="./logos/waves-logo-login.png" style={{ width: '20rem' }} alt="logo letters"/>
              <img className="logo-waves" src="./logos/image-logo-login.png" style={{ width: '5rem' }} alt="logo letters"/>
              <form className="login-form" onSubmit={this.handleSubmit}>
                <input
                  className="login-input"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="  📩Email"
                  value={email}
                  onChange={this.handleChange}
                />
                <input
                  className="login-input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="  🔐Password"
                  value={password}
                  onChange={this.handleChange}
                />
                { !loginNotification && ( appLoginNotification )  }
                { loginNotification }
                <input className="input-login-button" type="submit" value="Enter" />
              </form>
              <Link onClick={this.handleAppState} className="link-signup" to="/signup">No account yet?<br/> <u>Sign up here!</u></Link>
              <div className="login-footer">
                <img  style={{ width: '2rem' }} src="./logos/image-logo.png" alt=""/>
                <p>© WAVES Trademark</p>
              </div>
            </div>
            <Background />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Login;