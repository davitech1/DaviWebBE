'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const router = express.Router();

// middleware
// const { authenticateJWT } = require('../../middleware/checkToken')

router.post('/user/signup', accessController.signUp)
router.post('/user/login',accessController.login)

module.exports = router