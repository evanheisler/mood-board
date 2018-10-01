import React, { Component } from 'react';
import Loading from 'Loading';
import Project from 'Project';
import NewProject from './Form/NewProject';

class Projects extends Component {
  state = {
    projects: [],
    isLoaded: false
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

  setNew = project => {
    this.setState(prevState => {
      return {
        projects: [project, ...prevState.projects]
      };
    });
  };

  handleRemove = id => {
    fetch(`/api/project/${id}`, {
      method: 'DELETE'
    }).then(() => {
      const projects = this.state.projects.filter(project => project.id !== id);
      this.setState({
        projects
      });
    });
  };

  render() {
    const { isLoaded, projects } = this.state;

    if (!isLoaded) {
      return <Loading />;
    }

    return (
      <div className="card-group">
        <NewProject setNew={this.setNew} />
        {!projects.length ? (
          <div className="card">
            <div className="card-body">
              <div className="card-title">No Results</div>
            </div>
          </div>
        ) : (
          projects.map(project => (
            <Project
              key={project.id}
              data={project}
              delete={this.handleRemove}
            />
          ))
        )}
      </div>
    );
  }
}

export default Projects;
