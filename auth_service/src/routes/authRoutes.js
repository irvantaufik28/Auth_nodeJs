const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();
const validator = require('../middlerware/validator')



router.post('/register',validator.UserValidation, authController.register);
router.post('/login', authController.login);

module.exports = router;