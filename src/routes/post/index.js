'use strict'

const express = require('express');

const PostController = require('../../controllers/post.controller')
const authenticateJWT = require('../../middleware/authenticateJWT'); 
const logPostId = require('../../middleware/logPostId') 

const router = express.Router();
router.post('/post/new',authenticateJWT,PostController.createPost)
router.put('/post/update/:post_id', authenticateJWT, logPostId, PostController.updatePost);
router.get('/post/:post_id',PostController.viewPost)

module.exports = router