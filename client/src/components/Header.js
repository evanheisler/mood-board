import React from 'react';
import CircleURL from 'SVG/logo.svg';

const Header = () => {
  return (
    <div className="header bg-light py-4">
      <div className="container text-dark">
        <div className="d-flex justify-content-center">
          <div className="d-flex">
            <img src={CircleURL} alt="Proji App" width="128" height="128" />
            <div className="title-wrapper ml-3">
              <h1 className="display-1 my-0">Proji!</h1>
              <p>
                Get a pulse on open projects at-a-glance
                <br /> with an emoji!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
