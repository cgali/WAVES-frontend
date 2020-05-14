import React, { Component } from 'react';
import Cart from "../components/cart/Cart";
import Loading from "../views/Loading";

import "./css/surfersList.css"

import apiClient from "../services/apiClient";



const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

class SurfersList extends Component {
  
  state ={
    surfers: [],
    status: STATUS.LOADING,
  }

  loadSurfers = () => {
    apiClient
      .surfersList()
      .then(({ data }) => {
        this.setState({
          surfers: data,
          status: STATUS.LOADED,
        });
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          error: error.name,
          status: STATUS.ERROR,
        });
      });
  };

  componentDidMount() {
    this.loadSurfers();
  }

  listingSurfers = () => {
    const { surfers } = this.state;
    return surfers.map((surfer, index) => {
      return (
        <div>
          <Cart key={ index } img={ surfer.image } name={ surfer.name }/>
        </div>
      );
    });
  }

  render() {
    const { status } = this.state;

    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return this.listingSurfers();
      case STATUS.ERROR:
        return <div>{ status }</div>;
    }
  }
}


export default SurfersList;