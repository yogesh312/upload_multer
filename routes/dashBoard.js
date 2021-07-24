const user = require('../controller/authController');
const express = require('express');
const checkAuth = require('../middleware/checkAuth')
const router = express.Router();

router.post('/signup/', user.signup); // to create user
router.post('/login/', user.login); // to login 
//private auth
router.get('/home/', checkAuth, (req, res) =>{
    res.send("welcome to home page")
})

module.exports = router;