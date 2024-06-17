'use strict'

const mongoose = require('mongoose');
const Post = require('../models/post.model');
const PostVersion = require('../models/post_version.model');
const User = require('../models/user.model');  // Sử dụng mô hình User thay vì Admin

class PostService {
    static createPost = async (postData) => {
        try {
            const { admin_id, title, body, image } = postData;
            const createdAt = new Date();

            // Kiểm tra sự tồn tại của admin_id trong bảng User
            const adminExists = await User.findOne({ admin_id });
            
            if (!adminExists) {
                throw new Error('Admin ID does not exist');
            }

            const post = new Post({
                admin_id,
                status: 'active',
                created_at: createdAt,
                updated_at: createdAt,
                version: 1
            });
            await post.save();
            await PostService.createPostVersion(post, admin_id, title, body, image, createdAt);
            return post;
        } catch (error) {
            throw new Error('Error creating post: ' + error.message);
        }
    }

    static createPostVersion = async (post, update_by, title, body, image, createdAt) => {
        try {
            const postVersionData = {
                post_id: post.post_id, // Use 'post_id' from Post
                admin_id: post.admin_id,
                update_by: update_by,
                status: post.status,
                title: title,
                body: body.map(paragraph => ({ paragraph })),
                image: image,
                created_at: createdAt,
                version: post.version
            };
            const postVersion = new PostVersion(postVersionData);
            await postVersion.save();
        } catch (error) {
            throw new Error('Error creating post version: ' + error.message);
        }
    }
}

module.exports = PostService;
