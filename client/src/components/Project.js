import React from 'react';
import PropTypes from 'prop-types';

const Project = ({ data, ...rest }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{data.name}</div>
        {data.status.map(entry => (
          <div key={`${entry.name}-${data.id}`}>
            <h3>{entry.name}</h3>
            <p>{entry.niceName}</p>
            <h1>{String.fromCodePoint(entry.charCode)}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

Project.propTypes = {
  data: PropTypes.object.isRequired
};

export default Project;
