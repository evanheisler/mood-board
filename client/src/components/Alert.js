import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ data }) => {
  console.log(data);

  return (
    <div className={`pill-alert ${data.show ? 'on' : 'off'}`}>
      <div className={`alert alert-${data.type ? data.type : 'success'}`}>
        {data.msg}
      </div>
    </div>
  );
};

Alert.propTypes = {
  data: PropTypes.object.isRequired
};

export default Alert;
