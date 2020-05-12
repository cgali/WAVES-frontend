import React, { Component } from 'react';
import "../cart/cart.css";


class Cart extends Component {
  render() {
    const { img, name } = this.props;
    return(
      <div className="cart-container">
          <img src={ img } alt="profile img"/>
          <h2>{ name }</h2>
      </div>
    )
  }
}

export default Cart;