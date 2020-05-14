import React, { Component } from 'react';
import "../cart/cart.css";


class Cart extends Component {
  render() {
    const { img, name, secondaryName } = this.props;
    return(
      <div className="cart-container">
          <img className="cart-image" src={ img } alt="profile img"/>
          <h2>{ name } { secondaryName }</h2>
      </div>
    )
  }
}

export default Cart;