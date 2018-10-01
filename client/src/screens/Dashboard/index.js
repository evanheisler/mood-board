import React, { Component } from 'react';
import Page from 'Page';
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
      <Page>
        <Projects />
      </Page>
    );
  }
}

export default Dashboard;
