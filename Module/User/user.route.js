const express = require('express');
const { Signup, login } = require('./user.controller');
const router = express.Router();

router.route('/signup').post(Signup)
router.route('/login').post(login)

module.exports = router