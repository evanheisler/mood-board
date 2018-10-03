import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page from 'Page';
import Loading from 'Loading';
import Auth from 'Auth';
import Dashboard from 'Dashboard';

const auth = new Auth();

class App extends Component {
  state = {
    ping: false,
    loggedIn: auth.isAuthenticated()
  };

  componentDidMount() {
    if (!this.state.ping) {
      this.ping();
    }
  }

  handleAuthentication = nextState => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication(nextState.history);
    }
  };

  handleLogOut = () => {
    auth.logout();
    this.setState({ loggedIn: auth.isAuthenticated() });
  };

  ping = () => {
    fetch('/api/ping')
      .then(res => res.json())
      .then(ping => this.setState({ ping }));
  };

  render() {
    const { ping } = this.state;

    if (!ping) {
      return null;
    }

    return (
      <BrowserRouter>
        <Page auth={auth} logout={this.handleLogOut}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Dashboard auth={auth} {...props} />}
            />
            <Route
              path="/authenticate"
              render={props => {
                this.handleAuthentication(props);
                return <Loading {...props} />;
              }}
            />
          </Switch>
        </Page>
      </BrowserRouter>
    );
  }
}

export default App;
