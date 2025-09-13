const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectsByType,
  deleteProject
} = require('../controllers/ProjectController');
const { protect } = require('../middleware/authMiddileWare');

router.post('/CreateProject', protect, createProject);
router.get('/GetProject', getProjects);
router.get('/type/:type', getProjectsByType);
router.delete('/:id', protect, deleteProject);

module.exports = router;
