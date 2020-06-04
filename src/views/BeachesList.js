import React, { Component } from 'react';
import Cart from "../components/cart/Cart";
import Loading from "../views/Loading";
import Error500 from "../views/Error500";
import SearchBar from "../components/searchbar/Searchbar";
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
    beachesFilter: "",
    status: STATUS.LOADING,
  }

  componentDidMount() {
    this.loadBeaches();
  }

  loadBeaches = () => {
    apiClient
      .beachesList()
      .then(( response ) => {
        this.setState({
          beaches: response.data.beaches,
          status: STATUS.LOADED,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.name,
          status: STATUS.ERROR,
        });
      });
  };

  handleFilter = event => {
    this.setState({
      beachesFilter: event.target.value
    })
  }

  listingBeaches = () => {
    const { beaches, beachesFilter } = this.state;
    const filteredBeaches = beaches.filter((beach) => {
      return beach.name.toLowerCase().indexOf( beachesFilter.toLowerCase() ) !== -1
    })
    return filteredBeaches.map((beach, index) => {
      return (
        <div key={`${beach.name}_${index}`}>
          <Cart img={ beach.image } name={ beach.name } link={`/beaches-list/${beach._id}`}/>
        </div>
      );
    });
  }

  render() {
    const { status, beachesFilter } = this.state;

    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return <div className="beaches-list-inside-background">
          <div className="beaches-list-container">
          <SearchBar inputValue={beachesFilter} inputOnChange={this.handleFilter}/>
          { this.listingBeaches() }
      </div> 
          </div>
      case STATUS.ERROR:
        return <Error500 />
    }
  }
}

export default withRouter(BeachesList);