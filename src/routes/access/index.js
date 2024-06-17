'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const SubmitController = require('../../controllers/submit.controller');
const PostController = require('../../controllers/post.controller')
const authenticateJWT = require('../../middleware/authenticateJWT'); // 

const router = express.Router();

router.post('/user/signup',accessController.signUp)
router.post('/user/login',accessController.login)
router.post('/submit', SubmitController.createCustomer.bind(SubmitController));
router.post('/post',authenticateJWT,PostController.createPost)
router.put('/posts/:postId',authenticateJWT, PostController.updatePost);
module.exports = router