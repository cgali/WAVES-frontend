import React, { Component } from 'react';
import Cart from "../components/cart/Cart";
import Loading from "../views/Loading";
import Error500 from "../views/Error500";
import SearchBar from "../components/searchbar/Searchbar";

import "./css/eventsList.css"

import apiClient from "../services/apiClient";



const STATUS = {
  LOADING: "⚡️LOADING⚡️",
  LOADED: "LOADED",
  ERROR: "❌ERROR❌",
};

class EventsList extends Component {

  state ={
    events: [],
    eventsFilter: "",
    status: STATUS.LOADING,
  }
  
  componentDidMount() {
    this.loadEvents();
  }

  loadEvents = () => {
    apiClient
      .eventsList()
      .then(( response ) => {
        console.log(response.data)
        this.setState({
          events: response.data.events,
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
      eventsFilter: event.target.value
    })
  }

  listingEvents = () => {
    const { events, eventsFilter } = this.state;
    const filteredEvents = events.filter((event) => {
      return event.title.toLowerCase().indexOf( eventsFilter.toLowerCase() ) !== -1
    })
    return filteredEvents.map((event, index) => {
      const eventDate = new Date(event.date)
      const formatDate = `${eventDate.getDate()} - ${eventDate.getMonth() + 1} - ${eventDate.getFullYear()}`
      return (
        <div key={`${event.name}_${index}`}>
          <Cart className="events-list-cart-container" img={ event.image } name={ event.title } date={ formatDate } link={`/events-list/${event._id}`}/>
        </div>
      );
    });
  }

  render() {
    const { status, eventsFilter } = this.state;

    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return <div className="events-list-inside-background">
          <div className="events-list-container">
            <SearchBar inputValue={eventsFilter} inputOnChange={this.handleFilter}/>
            { this.listingEvents() }
          </div>
        </div>
      case STATUS.ERROR:
        return <Error500 />
    }
  }
}


export default EventsList;