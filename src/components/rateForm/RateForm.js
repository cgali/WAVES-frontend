import React, { Component } from 'react';

import "../rateForm/rateForm.css";



class RateForm extends Component {
  render() {
    const { onSubmit, rateNotification, waveRate, backgroundRate, socialEnvironmentRate, onChange, buttonName, onClick } = this.props;
    return(
      <div className="rate-form-container">
        <h2 className="rate-form-title">Add a rate</h2>
        <p className="rate-form-parameters">(min 1 and max 5)</p>
        { rateNotification }
        <form className="rate-form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="waveRate">Waves:</label>
            <input
              className="rate-form-input"
              type="number"
              name="waveRate"
              id="waveRate"
              value={ waveRate }
              onChange={ onChange }
            />
          </div>
          <div>
            <label htmlFor="backgroundRate">Background:</label>
            <input
              className="rate-form-input"
              type="number"
              name="backgroundRate"
              id="backgroundRate"
              value={ backgroundRate }
              onChange={ onChange }
            />
          </div>
          <div>
            <label htmlFor="socialEnvironmentRate">Social environment:</label>
            <input
              className="rate-form-input"
              type="number"
              name="socialEnvironmentRate"
              id="socialEnvironmentRate"
              value={ socialEnvironmentRate }
              onChange={ onChange }
            />
          </div>
          <div className="rate-form-buttons-box">
            <input className="input-rate-form-button" type="submit" value={ buttonName } />
            <button className="close-rate-form-button" onClick={ onClick }>Close</button>
          </div>
        </form>
      </div>
    )
  }
}

export default RateForm;