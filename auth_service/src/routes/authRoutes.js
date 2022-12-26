const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();
const validator = require('../middlerware/validator')
const authorized = require('../middlerware/authorization');



router.post('/register',validator.UserValidation, authController.register);
router.post('/login', authController.login);
router.post('/verify-token', authorized, authController.verfyToken)

module.exports = router;