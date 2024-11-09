// src/routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controller');

// Định nghĩa các route RESTful cho User 
router.post('/users/signup', userController.signUp);
router.post('/users/login', userController.logIn);
router.post('/users/logout', (req, res) => {

    res.status(200).json({ message: 'Logout thành công' });
});
module.exports = router;