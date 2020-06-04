import React, { Component } from "react";
import Login from "./views/Login";
import Signup from "./views/Signup";
import UserProfile from "./views/UserProfile";
import UpdateProfileForm from "./views/UpdateProfileForm";
import SurfersList from "./views/SurfersList";
import SurferProfile from "./views/SurferProfile";
import BeachesList from "./views/BeachesList";
import BeachProfile from "./views/BeachProfile";
import EventsList from "./views/EventsList";
import EventProfile from "./views/EventProfile";
import EventAddForm from "./views/EventAddForm";
import AboutUs from "./views/AboutUs";
import Contact from "./views/Contact";
import Loading from "./views/Loading";
import Error500 from "./views/Error500";

import Layout from "./components/layout/Layout";

import { Switch, withRouter, Route } from "react-router-dom";
import { AnonRoute, PrivateRoute } from "./components";
import { UserContext } from "./context/UserContext";

import apiClient from "./services/apiClient";


class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
    surfersActive: '#26afe6',
    beachesActive: '#26afe6',
    eventsActive: '#26afe6',
    appLoginNotification: null,
    appSignupNotification: null,
  };

  componentDidMount() {
    this.handleWhoAmI()
  }

  handleWhoAmI = () => {
    apiClient
      .whoami()
      .then((user) => {
        this.setState({
          user,
          isLoading: false,
          isLoggedIn: true,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
        console.log(error)
      });
  }

  handleLogin = ({ email, password }) => {
    apiClient
      .login({ email, password })
      .then((user) => {
        this.setState({
          user,
          isLoggedIn: true,
          appLoginNotification: null,
        });
      })
      .catch((error) => {
        this.setState({
          appLoginNotification: <p className="login-form-notification">Incorrect <strong style={{ color: "#29d1d1"}}>EMAIL</strong> or <strong style={{ color: "#29d1d1"}}>PASSWORD</strong></p>,
          isLoggedIn: false,
          user: null,
        });
        console.log(error)
      });
  };

  handleSignup = ({ image, name, surname, email, password }) => {
    apiClient
      .signup({ image, name, surname, email, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          appSignupNotification: <p className="signup-form-notification">This <strong style={{ color: "#29d1d1"}}>EMAIL</strong> already registered</p>,
          isLoggedIn: false,
          user: null,
        });
      });
  };

  handleLogout = () => {
    apiClient
      .logout()
      .then(() => {
        this.setState({
          isLoggedIn: false,
        });
        this.props.history.push('/login')
      })
      .catch((error) => {
        console.log(error)
      });
  };

  handleAppStateNotification = () => {
    this.setState({
      appLoginNotification: null,
      appSignupNotification: null
    })
  }

  render() {
    const { 
      isLoggedIn,
      isLoading,
      user,
      appLoginNotification,
      appSignupNotification
    } = this.state;

    return (
      <div>
        {isLoading && <Loading />}
        {!isLoading && (
          <div className="App">
            <Layout isLoggedIn={ isLoggedIn } onLogout={ this.handleLogout } user={ user } >
              <Switch>
                <UserContext.Provider 
                  value={{ 
                    user: user,
                    appLoginNotification: appLoginNotification,
                    appSignupNotification: appSignupNotification,
                    handleAppStateNavbar: this.handleAppStateNavbar,
                    handleLogginOut: this.handleLogout,
                   }}>
                  <AnonRoute exact path={"/"} isLoggedIn={isLoggedIn}>
                    <Login onLogin={this.handleLogin} handleAppStateNotification={this.handleAppStateNotification}/>
                  </AnonRoute>
                  <AnonRoute exact path={"/login"} isLoggedIn={isLoggedIn}>
                    <Login onLogin={this.handleLogin} handleAppStateNotification={this.handleAppStateNotification}/>
                  </AnonRoute>
                  <AnonRoute exact path={"/signup"} isLoggedIn={isLoggedIn}>
                    <Signup onSignup={this.handleSignup} handleAppStateNotification={this.handleAppStateNotification}/>
                  </AnonRoute>
                  <Route exact path={"/error"} isLoggedIn={isLoggedIn} component={ Error500 } />
                  <Route exact path={"/contact"} isLoggedIn={isLoggedIn} component={ Contact } />
                  <PrivateRoute exact path={"/about-us"} isLoggedIn={isLoggedIn} component={ AboutUs } />
                  <PrivateRoute exact path={"/profile"} isLoggedIn={isLoggedIn} component={ UserProfile } />
                  <PrivateRoute exact path={"/profile-update"} isLoggedIn={isLoggedIn} component={ UpdateProfileForm } />
                  <PrivateRoute exact path={"/surfers-list"} isLoggedIn={isLoggedIn} component={ SurfersList } />
                  <PrivateRoute exact path={"/surfers-list/:id"} isLoggedIn={isLoggedIn} component={ SurferProfile } />
                  <PrivateRoute exact path={"/beaches-list"} isLoggedIn={isLoggedIn} component={ BeachesList } />
                  <PrivateRoute exact path={"/beaches-list/:id"} isLoggedIn={isLoggedIn} component={ BeachProfile } />
                  <PrivateRoute exact path={"/events-list"} isLoggedIn={isLoggedIn} component={ EventsList } />
                  <PrivateRoute exact path={"/events-list/:id"} isLoggedIn={isLoggedIn} component={ EventProfile } />
                  <PrivateRoute exact path={"/add-event"} isLoggedIn={isLoggedIn} component={ EventAddForm } />
                </UserContext.Provider>
              </Switch>
            </Layout>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
