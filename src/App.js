import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Login from "./views/Login";
import Home from "./views/Home";
import Loading from "./views/Loading";
import Protected from "./views/Protected";
import SurfersList from "./views/SurfersList";
import SurferProfile from "./views/SurferProfile";
import BeachesList from "./views/BeachesList";
import BeachProfile from "./views/BeachProfile";
import EventsList from "./views/EventsList";
import EventProfile from "./views/EventProfile";
import UserProfile from "./views/UserProfile";
import Signup from "./views/Signup";

import { AnonRoute, PrivateRoute } from "./components";
import { UserContext } from "./context/UserContext";

import apiClient from "./services/apiClient";
import Layout from "./components/layout/Layout";



class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
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
      });
  }

  handleLogin = ({ email, password }) => {
    apiClient
      .login({ email, password })
      .then(({ data: user }) => {
        console.log('app.js', user)
        this.setState({
          user,
          isLoggedIn: true,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  handleSignup = ({ name, surname, email, password }) => {
    apiClient
      .signup({ name, surname, email, password })
      .then(({ data: user }) => {
        console.log('app.js', user)
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
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

  

  render() {
    const { isLoggedIn, isLoading, user } = this.state;
    return (
      <div>
        {isLoading && <Loading />}
        {!isLoading && (
          <div className="App">
            <Layout isLoggedIn={isLoggedIn} onLogout={this.handleLogout} user={user}> 
              <Switch>
                <UserContext.Provider value={{ user: this.state.user }}>
                  <Route exact path={"/"} component={Home} />
                  <AnonRoute exact path={"/login"} isLoggedIn={isLoggedIn}>
                    <Login onLogin={this.handleLogin} />
                  </AnonRoute>
                  <AnonRoute exact path={"/signup"} isLoggedIn={isLoggedIn}>
                    <Signup onSignup={this.handleSignup} />
                  </AnonRoute>
                  <PrivateRoute exact path={"/protected"} isLoggedIn={isLoggedIn} component={ Protected } />
                  <PrivateRoute exact path={"/profile"} isLoggedIn={isLoggedIn} component={ UserProfile } />
                  <PrivateRoute exact path={"/surfers-list"} isLoggedIn={isLoggedIn} component={ SurfersList } />
                  <PrivateRoute exact path={"/surfers-list/:id"} isLoggedIn={isLoggedIn} component={ SurferProfile } />
                  <PrivateRoute exact path={"/beaches-list"} isLoggedIn={isLoggedIn} component={ BeachesList } />
                  <PrivateRoute exact path={"/beaches-list/:id"} isLoggedIn={isLoggedIn} component={ BeachProfile } />
                  <PrivateRoute exact path={"/events-list"} isLoggedIn={isLoggedIn} component={ EventsList } />
                  <PrivateRoute exact path={"/events-list/:id"} isLoggedIn={isLoggedIn} component={ EventProfile } />
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
