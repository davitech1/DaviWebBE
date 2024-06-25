'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const authenticateJWT = require('../../middleware/authenticateJWT'); // 

const router = express.Router();

router.post('/user/signup',accessController.signUp)
router.post('/user/login',accessController.login)
router.post('/user/logout',authenticateJWT,accessController.logout);

module.exports = router