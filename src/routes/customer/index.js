'use strict'

const express = require('express');
const SubmitController = require('../../controllers/submit.controller');
const PostController = require('../../controllers/post.controller') 

const router = express.Router();

router.post('/submit', SubmitController.createCustomer);

module.exports = router