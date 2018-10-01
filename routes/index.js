const express = require('express');
const router = express.Router();

const projectController = require('../controllers').project;

router.get('/api/projects', projectController.list);
router.get('/api/project/:id', projectController.getById);
router.post('/api/project', projectController.add);
router.put('/api/project/:id', projectController.update);
router.delete('/api/project/:id', projectController.delete);

module.exports = router;
