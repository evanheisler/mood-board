import React, { Component } from 'react';
import Projects from './Projects';

class Dashboard extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    if (!isAuthenticated()) {
      this.login();
      return null;
    }

    return (
      <div className="container">
        <h4>You are logged in!</h4>
        <button onClick={() => this.props.auth.logout(this.props.history)}>
          Log Out
        </button>
        <Projects />
      </div>
    );
  }
}

export default Dashboard;
