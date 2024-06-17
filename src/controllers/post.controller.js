'use strict'

const PostService = require ('../services/post.service');

class PostController {
    static createPost = async (req, res) => {
        try {
            const admin_id = req.user.idUser;
            const { title, body, image } = req.body;
            const postData = { admin_id, title, body, image };
            const newPost = await PostService.createPost(postData);
            return res.status(201).json(newPost);        
        } catch (error) {
            console.error('Create post fail:', error.message);
            if (error.message === 'Admin ID does not exist') {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static updatePost = async(req,res) => {
        try {
            const postId = {update_by, title, body, image}  
            const updateData = req.body;
            const post= await PostService.updatePost(postId, updateData);
            if (!post){
                return res.status(404).json({message:'Post not found'});
            }
            return res.status(200).json(post);
        } catch (error) {
            console.error ('Update post error', error.message);
            return res.status(500).json({message:'Internal Server Error'})
        }
    }
}
module.exports= PostController