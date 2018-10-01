const Project = require('../models').Project;
const Student = require('../models').Student;

module.exports = {
  list(req, res) {
    return Project.findAll({
      order: [['createdAt', 'DESC']]
    })
      .then(projects => res.status(200).send(projects))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Project.findById(req.params.id, {})
      .then(project => {
        if (!project) {
          return res.status(404).send({
            message: 'Project Not Found'
          });
        }
        return res.status(200).send(project);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    return Project.create({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status
    })
      .then(project => res.status(201).send(project))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Project.findById(req.params.id, {})
      .then(project => {
        if (!project) {
          return res.status(404).send({
            message: 'Project Not Found'
          });
        }
        return project
          .update({
            name: req.body.name || project.name,
            description: req.body.description || project.description,
            status: req.body.status || project.status
          })
          .then(() => res.status(200).send(project))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Project.findById(req.params.id)
      .then(project => {
        if (!project) {
          return res.status(400).send({
            message: 'Project Not Found'
          });
        }
        return project
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
