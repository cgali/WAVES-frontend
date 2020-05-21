import React, { Component } from 'react';
import Cart from "../components/cart/Cart";
import Loading from "../views/Loading";
import Error500 from "../views/Error500";
import { withRouter } from 'react-router-dom'

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
      .beachesList()
      .then(( response ) => {
        console.log(response.data)
        this.setState({
          beaches: response.data.beaches,
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
        <div key={`${beach.name}_${index}`}>
          <Cart img={ beach.image } name={ beach.name } link={`/beaches-list/${beach._id}`}/>
        </div>
      );
    });
  }

  render() {
    const { status } = this.state;
    console.log(this.props)

    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return <div className="beaches-list-container">
          { this.listingBeaches() }
      </div> 
      case STATUS.ERROR:
        return <Error500 />
    }
  }
}


export default withRouter(BeachesList);