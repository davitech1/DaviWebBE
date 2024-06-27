'use strict';
const mongoose = require('mongoose');
const config = require('../configs/config.mongodb');
const seedDatabase = require('../models/typeSeeder.model'); // Đảm bảo đường dẫn chính xác đến tệp seeder của bạn

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        const { host, port, name } = config.db;
        const mongoURI = `mongodb://${host}:${port}/${name}`;

        mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Connected to MongoDB');
            return seedDatabase(); // Gọi seeder khi kết nối thành công
        }).then(() => {
            console.log('Database seeded successfully');
        }).catch(err => {
            console.error('Failed to connect to MongoDB', err);
        });
    }
}

module.exports = new Database();
