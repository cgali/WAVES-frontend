import React, { Component } from 'react';
import Cart from "../components/cart/Cart";
import Loading from "../views/Loading";
import Error500 from "../views/Error500";

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
    status: STATUS.LOADING,
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

  componentDidMount() {
    this.loadEvents();
  }

  listingEvents = () => {
    const { events } = this.state;
    return events.map((event, index) => {
      const eventDate = new Date(event.date)
      const formatDate = `${eventDate.getDate()} - ${eventDate.getMonth()} - ${eventDate.getFullYear()}`
      return (
        <div>
          <Cart key={ index } img={ event.image } name={ event.title } date={ formatDate } link={`/events-list/${event._id}`}/>
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
        return <div>
          { this.listingEvents() }
        </div> 
      case STATUS.ERROR:
        return <Error500 />
    }
  }
}


export default EventsList;