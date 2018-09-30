import React, { Component } from 'react';
import Loading from 'Loading';
import Project from 'Project';

class Projects extends Component {
  state = {
    projects: [],
    isLoaded: false
  };

  componentDidMount() {
    fetch('/api/projects')
      .then(res => res.json())
      .then(projects =>
        this.setState({
          projects,
          isLoaded: true
        })
      )
      .catch(err => {
        this.setState({
          isLoaded: true
        });
      });
  }

  render() {
    const { isLoaded, projects } = this.state;

    if (!isLoaded) {
      return <Loading />;
    }

    return (
      <div className="card-deck">
        {!projects.length ? (
          <div className="card">
            <div className="card-body">
              <div className="card-title">No Results</div>
            </div>
          </div>
        ) : (
          projects.map(project => <Project key={project.id} data={project} />)
        )}
      </div>
    );
  }
}

export default Projects;
