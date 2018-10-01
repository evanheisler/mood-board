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
      <React.Fragment>
        <div className="row py-2 text-info">
          <div className="col-5 mr-auto">Client or Project Name</div>
          <div className="col-2 text-center">Project</div>
          <div className="col-2 text-center">Team</div>
          <div className="col-1">&nbsp;</div>
        </div>
        <NewProject setNew={this.setNew} />
        <div className="row entries my-4">
          <div className="col pl-4">
            {!projects.length ? (
              <h3>No Results</h3>
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
        </div>
      </React.Fragment>
    );
  }
}

export default Projects;
