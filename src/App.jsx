import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import { Form, FormControl, Button, Alert } from 'react-bootstrap';

const getNextYear = () => {
  const current = new Date().getFullYear();
  return new Date(`${current + 1}`).getFullYear();
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: 'Introduce a valid date',
    };
    this.displayDateInputError = false;
  }

  validateNewDeadline() {
    const parsed = Date.parse(this.newDeadline);
    return !!parsed && parsed > new Date();
  }

  changeDeadline() {
    const valid = this.validateNewDeadline();

    const state = valid ? { deadline: this.newDeadline } : this.state;
    this.displayDateInputError = !valid;

    this.setState(state);
  }

  handleDateInputErrorClose() {
    this.displayDateInputError = false;
    this.setState(this.state);
  }

  render() {
    return (
      <div className="App">
        <div className="App-title-small">Time until</div>
        <div className="App-title-big">{this.state.deadline}</div>
        <Clock deadline={this.state.deadline} />
        <div className="Form">
          <input
            className="Deadline-input"
            onChange={(event) => (this.newDeadline = event.target.value)}
            placeholder="Enter date"
            
          />
          <Button
            variant="outline-dark"
            onClick={() => this.changeDeadline()}>
            Submit
          </Button>
        </div>
        <div>
          <Alert
            variant="warning"
            className="Input-alert"
            show={this.displayDateInputError}
            onClose={() => this.handleDateInputErrorClose()}
          >
            <b>That's a no-go :(</b>{' '}
            <p>
              Try entering a valid future date. Example: 'November 5,{' '}
              {getNextYear()}'
            </p>
          </Alert>
        </div>
      </div>
    );
  }
}

export default App;
