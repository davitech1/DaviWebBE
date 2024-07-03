'use strict';
const mongoose = require('mongoose');
const config = require('../configs/config.mongodb');

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
            console.log('Database seeded successfully');
        }).catch(err => {
            console.error('Failed to connect to MongoDB', err);
        });
    }
}

module.exports = new Database();
