import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
  componentWillMount() {
    this.setState(this.getTimeUntil());
    this.timerId = setInterval(() => this.setState(this.getTimeUntil()), 1000);
  }

  getTimeUntil() {
    const timeInSeconds = Math.floor(
      (Date.parse(this.props.deadline) - Date.parse(new Date())) / 1000,
    );
    const seconds = timeInSeconds % 60;
    const minutes = Math.floor(timeInSeconds / 60) % 60;
    const hours = Math.floor(timeInSeconds / 60 / 60) % 24;
    const days = Math.floor(timeInSeconds / 60 / 60 / 24) % 365;
    return { days, hours, minutes, seconds };
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  unitSingleOrPlural(amount, singleUnitName, pluralUnitName) {
    return `${amount} ${amount === 1 ? singleUnitName : pluralUnitName}`;
  }

  render() {
    return (
      <div className={'Clock'}>
        <div className="Clock-text">
          {this.unitSingleOrPlural(this.state.days, 'day', 'days')}
        </div>
        <div className="Clock-text">
          {this.unitSingleOrPlural(this.state.hours, 'hour', 'hours')}
        </div>
        <div className="Clock-text">
          {this.unitSingleOrPlural(this.state.minutes, 'minute', 'minutes')}
        </div>
        <div className="Clock-text">
          {this.unitSingleOrPlural(this.state.seconds, 'second', 'seconds')}
        </div>
      </div>
    );
  }
}

export default Clock;
