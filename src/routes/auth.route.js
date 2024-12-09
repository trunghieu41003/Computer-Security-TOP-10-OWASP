const { authenticateAdmin, authenticateUser } = require('../controllers/auth.controller');
// src/routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controller');

//Định nghĩa các route RESTful cho User 
router.post("/user", authenticateUser, (req, res) => {
    res.status(200).json({ message: 'Welcome user' });
});


router.post('/users/signup', userController.signUp);
router.post('/users/login', userController.logIn);
//A05 expose information on url
// router.get('/users/login', userController.logIn);
router.post('/users/logout', (req, res) => {

    res.status(200).json({ message: 'Logout thành công' });
});
// Thêm route cho admin
// router.get("/admin", authenticateAdmin, (req,res) =>{
//     res.status(200).json({ message: 'Welcome Admin', user: req.user });
// })
//A05 REMOVE 'authenticateAdmin' middleware to bypass admin check
router.get("/admin", (req, res) => {
    res.status(200).json({ message: 'Welcome Admin' });
});
router.get("/user", authenticateUser, (req, res) => {
    res.status(200).json({ message: 'Welcome User', user: req.user });
})
// router.get('/protected-resource', authenticateToken, (req, res) => {
//     // If token is valid, proceed here
//     res.json({ message: 'This is a protected resource', user: req.user });
// });

module.exports = router;