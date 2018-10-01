import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Delete } from 'SVG/recycle.svg';

const Project = ({ data, ...rest }) => {
  return (
    <div className="row">
      <div className="col pl-4">
        <div className="row align-items-center">
          <div className="col-5 mr-auto">
            <h3 className="my-0">{data.name}</h3>
          </div>
          {data.status.map(entry => (
            <div className="col-2 text-center" key={`${entry.name}-${data.id}`}>
              <div className="emoji-trigger">
                <span className="emoji">{entry.char}</span>
              </div>
            </div>
          ))}
          <div className="col-1 text-right">
            <Delete
              className="icon-delete rounded-circle"
              onClick={() => rest.delete(data.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Project.propTypes = {
  data: PropTypes.object.isRequired,
  delete: PropTypes.func.isRequired
};

export default Project;
