import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    ping: false
  };
  // Fetch passwords after first mount
  componentDidMount() {
    this.ping();
  }

  ping = () => {
    fetch('/api/ping')
      .then(res => res.json())
      .then(ping => this.setState({ ping }));
  };

  render() {
    const { ping } = this.state;

    return (
      <div className="App">
        {ping != null ? 'API is Available' : 'Connection not established.'}
        <button onClick={this.ping}>Send Request</button>
      </div>
    );
  }
}

export default App;
