'use strict'

const mongoose = require('mongoose');
const Post = require('../models/post.model');
const PostVersion = require('../models/postVersion.model');
const Admin = require('../models/admin.model');

class PostService {
    static createPost = async (postData) => {
        try {
            const { title, body, image, update_by } = postData;
            const createdAt = new Date();

            console.log(`Checking if admin ${update_by} exists in Admin collection`);
            const adminExists = await Admin.findOne({ name: update_by }).lean();
            if (!adminExists) {
                console.log(`Admin ${update_by} does not exist`);
                throw new Error('Admin does not exist');
            }

            const post = new Post({
                status: 'active',
                version: 1
            });
            await post.save();
            await PostService.createPostVersion(post, update_by, title, body, image, createdAt);
            return post;
        } catch (error) {
            throw new Error('Error creating post: ' + error.message);
        }
    }

    static createPostVersion = async (post, update_by, title, body, image, createdAt) => {
        try {
            const postVersionData = {
                post_id: post.post_id, 
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

    static updatePost = async (postId, updateData) => {
        try {
            console.log(`Finding post with post_id: ${postId}`);
            const post = await Post.findOne({ post_id: postId });
            if (!post) {
                throw new Error('Post not found');
            }

            const { status,title, body, image, update_by } = updateData;
            const updatedAt = new Date();
            if (status && status !== post.status) {
                post.status = status;
                post.updated_at = updatedAt;
                await post.save();
                return post;
            }
            post.title = title;
            post.body = body;
            post.image = image;
            post.updated_at = updatedAt;
            post.version += 1;
            await post.save();

            await PostService.createPostVersion(post, update_by, title, body, image, updatedAt);
            return post;
        } catch (error) {
            throw new Error('Error updating post: ' + error.message);
        }
    }
    static getLatestPost = async( postId) => {
        console.log('kiểm tra tại getLatestPost:',postId);
        try {
            const latestPostVersion = await PostVersion.findOne({ post_id: postId })
                .sort({ version: -1 }) 
                .lean();
            const statusCheck = await Post.findOne({ post_id: postId })
            if (statusCheck.status === 'inactive') {
                return null
            }
            return latestPostVersion;
        } catch (error) {
            throw new Error('Error retrieving post: ' + error.message);
        }
    }    
}

module.exports = PostService;
