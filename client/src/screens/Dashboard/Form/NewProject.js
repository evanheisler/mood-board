import React, { Component } from 'react';
import emoji from 'emojilib';
import PropTypes from 'prop-types';
import { handleJSONResponse } from 'utils/api';
import { ReactComponent as Add } from 'SVG/add.svg';

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
      <div className="row entry-form">
        <div className="col pl-4">
          <div className="row align-items-center">
            <div className="col-5 mr-auto">
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
              <div className="emoji-trigger" onClick={this.handleTogglePicker}>
                <span className="emoji">{projectStatus.char}</span>
              </div>
            </div>
            <div className="col-2 text-center">
              <div className="emoji-trigger" onClick={this.handleTogglePicker}>
                <span className="emoji">{teamStatus.char}</span>
              </div>
            </div>
            <div className="col-1 text-right">
              <Add className="icon-add" onClick={this.handleAddNew} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewProject.propTypes = {
  setNew: PropTypes.func.isRequired
};

export default NewProject;
