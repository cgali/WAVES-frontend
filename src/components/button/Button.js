import React, { Component } from 'react';


class Button extends Component {
  render() {
    const { name, color, onClick } = this.props;
    return (
      <button className="button-template" style={{ background: {color} }} onClick={ onClick }>{ name }</button>
    )
  }
}


export default Button;