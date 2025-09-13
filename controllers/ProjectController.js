const Project = require('../models/project.model');

exports.createProject = async (req, res) => {
  const {
    name,
    type,
    description,
    address,
    location,
    cost,
    startDate,
    completeDate,
    status
  } = req.body;

  try {
    const project = await Project.create({
      name,
      type,
      description,
      address,
      location,
      cost,
      startDate,
      completeDate,
      status,
      owner: req.user.id
    });
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating project' });
  }
};


exports.getProjects = async (req, res) => {
  const projects = await Project.find().populate('owner', 'name email');
  res.json(projects);
};

exports.getProjectsByType = async (req, res) => {
  const { type } = req.params;
  const projects = await Project.find({ type });
  res.json(projects);
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (project) res.json({ message: 'Project deleted' });
  else res.status(404).json({ message: 'Project not found' });
};
