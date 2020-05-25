import React, { Component } from 'react';

import "../searchbar/searchbar.css";


class SearchBar extends Component {

  render() {
    const { inputValue, inputOnChange} = this.props;
    return (
      <div>
        <div className="search-bar-box">
          <label  htmlFor="filter"></label>
          <input className="search-input" type="text" id="filter" 
          value={inputValue} 
          onChange={inputOnChange}
          placeholder="🔎Search by name"/>
        </div>
      </div>
    )
  }
}

export default SearchBar;