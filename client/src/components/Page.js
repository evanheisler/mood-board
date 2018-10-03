import React from 'react';
import Header from './Header';

const Page = props => {
  const { isAuthenticated } = props.auth;

  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <button
          className="btn btn-link ml-auto"
          onClick={() =>
            isAuthenticated() ? props.logout() : props.auth.login()
          }
        >
          Log {isAuthenticated() ? 'out' : 'in'}
        </button>
      </nav>
      <Header />
      <div className="container">{props.children}</div>
    </React.Fragment>
  );
};

export default Page;
