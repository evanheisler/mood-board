import React from 'react';
import Header from './Header';

const Page = props => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <button
          className="btn btn-link ml-auto"
          onClick={() => this.props.auth.logout(this.props.history)}
        >
          Log Out
        </button>
      </nav>
      <Header />
      <div className="container">{props.children}</div>
    </React.Fragment>
  );
};

export default Page;
