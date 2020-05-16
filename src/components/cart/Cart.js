import React, { Component } from 'react';
import "../cart/cart.css";
import { Link } from "react-router-dom";

class Cart extends Component {
  render() {
    const { img, name, secondaryName, date, link } = this.props;
    return(
      <div className="cart-container">
        <Link to={ link } ><img className="cart-image" src={ img } alt="profile img"/></Link>
        <Link to={ link } ><h2 className="cart-title">{ name } { secondaryName }</h2></Link>
        <h2>{ date }</h2>
      </div>
    )
  }
}

export default Cart;