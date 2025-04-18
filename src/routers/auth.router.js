const express = require('express');
const router = express.Router();
const {login, signup} = require('../controllers/auth.controller')
router.post('/login' ,login).post('/sign-up', signup)
module.exports = router;