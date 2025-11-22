const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getUsers);

module.exports = router;
