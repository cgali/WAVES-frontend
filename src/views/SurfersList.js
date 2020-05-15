import React, { Component } from 'react';
import Cart from "../components/cart/Cart";
import Loading from "../views/Loading";
import Error500 from "../views/Error500";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";

import "./css/surfersList.css"

import apiClient from "../services/apiClient";



const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

class SurfersList extends Component {

  state = {
    surfers: [],
    status: STATUS.LOADING,
  }

  loadSurfers = () => {
    apiClient
      .surfersList()
      .then(( response ) => {
        console.log(response.data)
        this.setState({
          surfers: response.data.surfers,
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
    console.log(surfers)
    return surfers.map((surfer, index) => {
      return <Cart key={ index } img={ surfer.image } name={ surfer.name } secondaryName={ surfer.surname } link={`/surfers-list/${surfer._id}`}/>
    });
  }

  render() {
    const { status } = this.state;

    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return <div>
          <Header />
          { this.listingSurfers() }
          <Navbar />
        </div> 
      case STATUS.ERROR:
        return <Error500 />
    }
  }
}


export default SurfersList;