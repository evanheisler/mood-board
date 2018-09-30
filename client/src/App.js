import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from 'Dashboard';
import Loading from 'Loading';
import Auth from 'Auth';

const auth = new Auth();

class App extends Component {
  state = {
    ping: false
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
      </BrowserRouter>
    );
  }
}

export default App;
