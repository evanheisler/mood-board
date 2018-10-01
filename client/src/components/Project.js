import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Delete } from 'SVG/recycle.svg';

const Project = ({ data, ...rest }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{data.name}</div>
        {data.status.map(entry => (
          <div key={`${entry.name}-${data.id}`}>
            <h3>{entry.name}</h3>
            <h1>{entry.char}</h1>
          </div>
        ))}
        <Delete className="icon-delete" onClick={() => rest.delete(data.id)} />
      </div>
    </div>
  );
};

Project.propTypes = {
  data: PropTypes.object.isRequired,
  delete: PropTypes.func.isRequired
};

export default Project;
