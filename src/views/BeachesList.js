import React, { Component } from 'react';
import Cart from "../components/cart/Cart";
import Loading from "../views/Loading";
import Error500 from "../views/Error500";

import "./css/beachesList.css"

import apiClient from "../services/apiClient";



const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

class BeachesList extends Component {

  state ={
    beaches: [],
    status: STATUS.LOADING,
  }

  loadBeaches = () => {
    apiClient
      .surfersList()
      .then(( response ) => {
        console.log(response.data)
        this.setState({
          beaches: response.data,
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
    this.loadBeaches();
  }

  listingBeaches = () => {
    const { beaches } = this.state;
    return beaches.map((beach, index) => {
      return (
        <div>
          <Cart key={ index } img={ beach.image } name={ beach.name }/>
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
        return this.listingBeaches();
      case STATUS.ERROR:
        return <Error500 />
    }
  }
}


export default BeachesList;