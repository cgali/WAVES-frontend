import React, { Component } from 'react';

import "../rateForm/rateForm.css";



class RateForm extends Component {
  render() {
    const { onSubmit, waveRate, backgroundRate, socialEnvironmentRate, onChange, buttonName } = this.props;
    return(
      <div className="rate-form-container">
        <form className="rate-form" onSubmit={onSubmit}>
          <label for="waveRate">Waves</label>
            <input
              type="number"
              name="waveRate"
              id="waveRate"
              min="0"
              max="5"
              value={ waveRate }
              onChange={ onChange }
            />
            <label for="backgroundRate">Background</label>
            <input
              type="number"
              name="backgroundRate"
              id="backgroundRate"
              min="0"
              max="5"
              value={ backgroundRate }
              onChange={ onChange }
            />
            <label for="socialEnvironmentRate">Social Environment</label>
            <input
              type="number"
              name="socialEnvironmentRate"
              id="socialEnvironmentRate"
              min="0"
              max="5"
              value={ socialEnvironmentRate }
              onChange={ onChange }
            />
            <input className="input-button" type="submit" value={ buttonName } />
          </form>
        </div>
    )
  }
}


export default RateForm;