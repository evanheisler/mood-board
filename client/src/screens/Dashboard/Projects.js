import React, { Component } from 'react';
import emoji from 'emojilib';
import Loading from 'Loading';
import Project from 'Project';
import NewProject from './Form/NewProject';
import EmojiPicker from './Form/EmojiPicker';
import Alert from 'Alert';

class Projects extends Component {
  state = {
    newProject: {
      client: emoji.lib.grinning,
      team: emoji.lib.grinning
    },
    projects: [],
    isLoaded: false,
    emojisOpen: false,
    editTarget: null,
    alert: {
      show: false,
      msg: '',
      type: 'success'
    }
  };

  componentDidMount() {
    fetch('/api/projects')
      .then(res => res.json())
      .then(resp =>
        this.setState({
          projects: resp || [],
          isLoaded: true
        })
      )
      .catch(err => {
        this.setState({
          isLoaded: true
        });
      });
  }

  setAlert = alert => {
    this.setState({
      alert: {
        show: true,
        ...alert
      }
    });

    setTimeout(() => {
      this.setState(prevState => {
        return {
          alert: {
            ...prevState.alert,
            show: false
          }
        };
      });
    }, 2000);
  };

  setNewProject = project => {
    this.setState(
      prevState => {
        return {
          projects: [project, ...prevState.projects]
        };
      },
      () => {
        this.setAlert({ msg: 'Saved!' });
      }
    );
  };

  handleRemoveProject = id => {
    fetch(`/api/project/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const projects = this.state.projects.filter(
          project => project.id !== id
        );
        this.setState({
          projects
        });
      })
      .then(() => this.setAlert({ msg: 'Removed!' }))
      .catch(() =>
        this.setAlert({ msg: 'Shoot! Something went wrong.', type: 'danger' })
      );
  };

  handleUpdateProject = project => {
    fetch(`/api/project/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...project
      })
    })
      .then(() => this.setAlert({ msg: 'Updated!' }))
      .catch(() =>
        this.setAlert({ msg: 'Shoot! Something went wrong.', type: 'danger' })
      );
  };

  toggleEmojiPicker = event => {
    const id = event.target.id;
    const target = document.getElementById(id);
    const allTriggers = document.getElementsByClassName('emoji-trigger');
    const otherTriggers = Array.from(allTriggers).filter(
      trigger => trigger.id !== id
    );

    otherTriggers.forEach(trigger => trigger.classList.remove('active'));
    target.classList.toggle('active');

    this.setState({
      emojisOpen: target.classList.contains('active') ? true : false,
      editTarget: id
    });
  };

  setEmoji = emoji => {
    const target = this.state.editTarget.split('-');

    this.setState(prevState => {
      if (target[0] === 'new') {
        return {
          newProject: {
            ...prevState.newProject,
            [target[1]]: emoji
          }
        };
      }

      const projects = prevState.projects;
      const projectToUpdate = projects.find(
        project => project.id === parseInt(target[0], 10)
      );
      projectToUpdate.status = projectToUpdate.status.map(entry => {
        if (entry.name === target[1]) {
          entry = { ...entry, ...emoji };
        }
        return entry;
      });

      this.handleUpdateProject(projectToUpdate);

      return {
        projects
      };
    });
  };

  render() {
    const { isLoaded, projects, newProject, emojisOpen, alert } = this.state;

    if (!isLoaded) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Alert data={alert} />
        <div className="row py-2 text-info">
          <div className="col-5 mr-auto pl-4">Client or Project Name</div>
          <div className="col-2 text-center">Project</div>
          <div className="col-2 text-center">Team</div>
          <div className="col-1">&nbsp;</div>
        </div>
        <NewProject
          data={newProject}
          setNew={this.setNewProject}
          emojiClick={this.toggleEmojiPicker}
        />
        <div
          className={`row entries my-4 ${emojisOpen ? 'entries-spacer' : ''}`}
        >
          <div className="col pl-4">
            {!projects.length ? (
              <h3>No Results</h3>
            ) : (
              projects.map(project => (
                <Project
                  key={project.id}
                  data={project}
                  delete={this.handleRemoveProject}
                  emojiClick={this.toggleEmojiPicker}
                />
              ))
            )}
          </div>
        </div>
        {emojisOpen && <EmojiPicker emojiClick={this.setEmoji} />}
      </React.Fragment>
    );
  }
}

export default Projects;
