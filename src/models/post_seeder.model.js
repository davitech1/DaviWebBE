'use strict'

const mongoose = require('mongoose');
const Post = require('./models/post.model'); // Đảm bảo đường dẫn đúng
require('dotenv').config();

const mongoURI = process.env.MONGO_URI; // Đảm bảo bạn đã thiết lập biến môi trường cho URI MongoDB

const posts = [
    {
        admin_id: '60d0fe4f5311236168a109ca', // Thay thế bằng ObjectId thực tế từ Admin collection
        status: 'active',
        title: 'First Post',
        body: 'This is the body of the first post.',
        image: 'path/to/image.jpg',
        version: 1
    },
    {
        admin_id: '60d0fe4f5311236168a109ca', // Thay thế bằng ObjectId thực tế từ Admin collection
        status: 'inactive',
        title: 'Second Post',
        body: 'This is the body of the second post.',
        version: 1
    }
];

async function seedData() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected...');
        
        // Xóa toàn bộ dữ liệu cũ
        await Post.deleteMany();
        console.log('Old data removed.');

        // Lưu dữ liệu mới
        for (let post of posts) {
            await Post.create(post);
        }
        console.log('New data seeded.');
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
}

seedData();
