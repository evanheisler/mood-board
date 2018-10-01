import React, { Component } from 'react';
import emoji from 'emojilib';
import PropTypes from 'prop-types';
import { handleJSONResponse } from 'utils/api';

class NewProject extends Component {
  state = {
    title: '',
    projectStatus: emoji.lib.grinning,
    teamStatus: emoji.lib.grinning
  };

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleTogglePicker = e => {
    // picker
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
            ...this.state.projectStatus
          },
          {
            name: 'team',
            ...this.state.teamStatus
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
    const { title, projectStatus, teamStatus } = this.state;

    return (
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="new-project-title" className="sr-only" />
            <input
              type="text"
              className="form-control underline-input"
              id="new-project-title"
              name="title"
              placeholder="Title"
              onChange={this.handleChangeInput}
              value={title}
            />
          </div>
          <div className="form-group">
            <div className="emoji-picker" onClick={this.handleTogglePicker}>
              <span className="emoji">{projectStatus.char}</span>
              <h6 className="group">Client or Project Status</h6>
            </div>
            <div className="emoji-picker" onClick={this.handleTogglePicker}>
              <span className="emoji">{teamStatus.char}</span>
              <h6 className="group">Team Status</h6>
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.handleAddNew}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

NewProject.propTypes = {
  setNew: PropTypes.func.isRequired
};

export default NewProject;
