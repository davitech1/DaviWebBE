'use strict'

const PostService = require('../services/post.service');

class PostController {
    static createPost = async (req, res) => {
        try {
            const { title, body, image } = req.body;

            const bodyArray = Array.isArray(body) ? body : [body];

            const { name } = req.user;
            if (!name) {
                return res.status(400).json({ message: 'Admin name is required' });
            }
            const postData = { title, body: bodyArray, image, update_by: name };
            const newPost = await PostService.createPost(postData);
            return res.status(201).json(newPost);        
        } catch (error) {
            console.error('Create post fail:', error.message);
            if (error.message === 'Admin does not exist') {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static updatePost = async (req, res) => {
        try {
            const postId = req.params.post_id; 
            console.log(`Received postId: ${postId}`);

            const { status, title, body, image } = req.body;

            const bodyArray = Array.isArray(body) ? body : [body];

            const { name } = req.user; 
            if (!name) {
                return res.status(400).json({ message: 'Admin name is required' });
            }
            const updateData = { status,title, body: bodyArray, image, update_by: name };
            const post =  await PostService.updatePost(postId, updateData);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            return res.status(200).json(post);
        } catch (error) {
            console.error('Update post error:', error.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static viewPost = async(req,res)=> {
        try{
            const postId = req.params.post_id;
            console.log(postId);
            const latestPost = await PostService.getLatestPost(postId);
            if (!latestPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            const {status,title, body, image} = latestPost;
            const postData = { title, body, image };
            return res.status(200).json(postData);
        } catch(error) {
            console.log('viewPost error: ',error.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = PostController;
