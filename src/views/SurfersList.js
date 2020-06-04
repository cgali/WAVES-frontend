import React, { Component } from 'react';
import Cart from "../components/cart/Cart";
import Loading from "../views/Loading";
import Error500 from "../views/Error500";
import SearchBar from "../components/searchbar/Searchbar";

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
    surfersFilter: "",
    status: STATUS.LOADING,
  }

  componentDidMount() {
    this.loadSurfers();
  }

  loadSurfers = () => {
    apiClient
      .surfersList()
      .then(( response ) => {
        this.setState({
          surfers: response.data.surfers,
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
      surfersFilter: event.target.value
    })
  }

  listingSurfers = () => {
    const { surfers, surfersFilter } = this.state;
    const filteredSurfers = surfers.filter((surfer) => {
      return surfer.name.toLowerCase().indexOf( surfersFilter.toLowerCase() ) !== -1
    })
    return filteredSurfers.map((surfer, index) => {
      return (
        <div key={`${surfer.name}_${index}`}>
          <Cart img={ surfer.image ? surfer.image : "../standard.png" } name={ surfer.name } secondaryName={ surfer.surname } link={`/surfers-list/${surfer._id}`}/>
        </div>
    )});
  }

  render() {
    const { status, surfersFilter } = this.state;

    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return <div className="surfers-list-inside-background">
          <div className="surfers-list-container">
            <SearchBar inputValue={surfersFilter} inputOnChange={this.handleFilter}/>
            { this.listingSurfers() }
          </div> 
        </div>
        
      case STATUS.ERROR:
        return <Error500 />
    }
  }
}

export default SurfersList;