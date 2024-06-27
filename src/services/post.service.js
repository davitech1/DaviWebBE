'use strict'

const mongoose = require('mongoose');
const Post = require('../models/post.model');
const PostVersion = require('../models/postVersion.model');
const Admin = require('../models/admin.model');

class PostService {
    static createPost = async (postData) => {
        try {
            const { type,title, abstract, image,body, update_by } = postData;
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
            await PostService.createPostVersion(post,type, update_by, title, abstract, image,body, createdAt);
            return post;
        } catch (error) {
            throw new Error('Error creating post: ' + error.message);
        }
    }

    static createPostVersion = async (post, type, update_by, title, abstract, image,body, createdAt) => {
        try {
            const postVersionData = {
                post_id: post.post_id, 
                update_by: update_by, 
                status: post.status,
                title: title,
                abstract: abstract,  
                type: type,
                image: image,
                body:body,
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

            const { type,status,title, abstract, image,body, update_by } = updateData;
            const updatedAt = new Date();
            if (status && status !== post.status) {
                post.status = status;
                post.updated_at = updatedAt;
                await post.save();
                return post;
            }
            post.type = type;
            post.title = title;
            post.abstract = abstract;
            post.image = image;
            post.body= body;
            post.updated_at = updatedAt;
            post.version += 1;
            await post.save();

            await PostService.createPostVersion(post, type, update_by, title, abstract, image, body, updatedAt);
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
    static getPostList = async( type) =>{
        try {
        console.log('Kiểm tra type của bài viết muốn được lấy:',type);
        const activePosts = await Post.find({ status: 'active' }).lean();
        const activePostIds = activePosts.map(post => post.post_id);
        console.log(activePostIds)
        if (type === 'all'){
            const postAll = await PostVersion.find({
                post_id: { $in: activePostIds },
            })
            return postAll
        }
        const postVersions = await PostVersion.find({
            post_id: { $in: activePostIds },
            type: type
        }).lean();
        console.log(postVersions)
            return postVersions;
        }catch (error) {
            throw new Error('Error retrieving posts by type: ' + error.message);
        }
    }
    static getList = async (filters) => {
        try {
            console.log('Kiểm tra điều kiện lọc của bài viết:', filters);

            // Tạo truy vấn cho Post dựa trên các điều kiện lọc
            const postQuery = {};

            if (filters.status) {
                postQuery.status = filters.status;
            }

            // Tìm tất cả các bài viết dựa trên điều kiện lọc
            const posts = await Post.find(postQuery).lean();
            const postIds = posts.map(post => post._id);

            if (postIds.length === 0) {
                console.log('Không có bài viết nào thỏa mãn điều kiện lọc');
                return [];
            }

            // Tạo truy vấn cho PostVersion dựa trên các điều kiện lọc và post_id từ bài viết thỏa mãn điều kiện lọc
            const postVersionQuery = {
                post_id: { $in: postIds }
            };

            if (filters.type) {
                postVersionQuery['body.type'] = filters.type;
            }

            if (filters.update_by) {
                postVersionQuery.admin_id = filters.admin_id;
            }

            if (filters.title) {
                postVersionQuery.title = { $regex: filters.title, $options: 'i' }; // Tìm kiếm tiêu đề không phân biệt chữ hoa chữ thường
            }

            // Tìm tất cả các phiên bản bài viết với điều kiện lọc
            const postVersions = await PostVersion.find(postVersionQuery).lean();

            if (postVersions.length === 0) {
                console.log('Không tìm thấy phiên bản bài viết nào với điều kiện lọc cụ thể');
                return [];
            }

            // Lấy phiên bản mới nhất của mỗi bài viết active và điều kiện lọc cụ thể
            const latestPosts = await Promise.all(postVersions.map(async (postVersion) => {
                const latestPost = await this.getLatestPost(postVersion.post_id);
                return latestPost;
            }));

            // Lọc ra các bài viết hợp lệ (không null)
            const filteredPosts = latestPosts.filter(post => post !== null);

            return filteredPosts;
        } catch (error) {
            throw new Error('Error retrieving posts by type: ' + error.message);
        }
    }
    
}

module.exports = PostService;
