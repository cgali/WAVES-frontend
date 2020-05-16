import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

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

import { AnonRoute, PrivateRoute } from "./components";

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
          isLoading: false,
          isLoggedIn: true,
          user,
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
                <Route exact path={"/"} component={Home} />
                <AnonRoute exact path={"/login"} isLoggedIn={isLoggedIn}>
                  <Login onLogin={this.handleLogin} />
                </AnonRoute>
                <PrivateRoute exact path={"/protected"} isLoggedIn={isLoggedIn} component={ Protected } />
                <PrivateRoute exact path={"/logout"} isLoggedIn={isLoggedIn} component={ Login } />
                <PrivateRoute exact path={"/surfers-list"} isLoggedIn={isLoggedIn} component={ SurfersList } />
                <PrivateRoute exact path={"/surfers-list/:id"} isLoggedIn={isLoggedIn} component={ SurferProfile } />
                <PrivateRoute exact path={"/beaches-list"} isLoggedIn={isLoggedIn} component={ BeachesList } />
                <PrivateRoute exact path={"/beaches-list/:id"} isLoggedIn={isLoggedIn} component={ BeachProfile } />
                <PrivateRoute exact path={"/events-list"} isLoggedIn={isLoggedIn} component={ EventsList } />
                <PrivateRoute exact path={"/events-list/:id"} isLoggedIn={isLoggedIn} component={ EventProfile } />
              </Switch>
            </Layout>
          </div>
        )}
      </div>
    );
  }
}

export default App;
