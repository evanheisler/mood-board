import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { handleJSONResponse } from 'utils/api';
import { ReactComponent as Add } from 'SVG/add.svg';

class NewProject extends Component {
  state = {
    title: '',
    description: ''
  };

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddNew = () => {
    fetch('/api/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.title,
        description: this.state.description,
        status: [
          {
            name: 'client',
            ...this.props.data.client
          },
          {
            name: 'team',
            ...this.props.data.team
          }
        ]
      })
    })
      .then(handleJSONResponse)
      .then(resp => {
        this.props.setNew(resp);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { title } = this.state;
    const { data } = this.props;
    const { emojiClick } = this.props;

    return (
      <div className="row entry-form align-items-center">
        <div className="col-5 mr-auto pl-4">
          <label htmlFor="new-project-title" className="sr-only" />
          <input
            type="text"
            className="form-control form-control-lg underline-input"
            id="new-project-title"
            name="title"
            placeholder="Title"
            onChange={this.handleChangeInput}
            value={title}
          />
        </div>
        <div className="col-2 text-center">
          <div
            id="new-client-emoji"
            className="emoji-trigger"
            onClick={emojiClick}
          >
            {data.client.char}
          </div>
        </div>
        <div className="col-2 text-center">
          <div
            id="new-team-emoji"
            className="emoji-trigger"
            onClick={emojiClick}
          >
            {data.team.char}
          </div>
        </div>
        <div className="col-1 text-right">
          <Add className="icon-add" onClick={this.handleAddNew} />
        </div>
      </div>
    );
  }
}

NewProject.propTypes = {
  setNew: PropTypes.func.isRequired
};

export default NewProject;
