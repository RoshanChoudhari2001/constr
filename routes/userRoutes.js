const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  updateProfilePicOnly
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddileWare');

// Auth routes
router.post('/register', register);
router.post('/login', login);

// User management
router.get('/', getUsers);
router.get('/:id', getUserById);

// Update full user info with optional file
router.put('/:id', upload.single('profilePic'), updateUser);

// Optional: Only update profile picture
router.put('/:id/upload-pic', upload.single('profilePic'), updateProfilePicOnly);

module.exports = router;
