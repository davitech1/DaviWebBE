'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const router = express.Router();

router.post('/user/signup', accessController.signUp)
router.post('/user/login',accessController.login)

module.exports = router