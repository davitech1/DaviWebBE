'use strict'

const mongoose = require('mongoose');
const { db:{host, port, name} } = require('../configs/config.mongodb');

const connectString = `mongodb://${host}:${port}/${name}`;
class Database {
    constructor () {
        this.connect();
    }

    connect(type = 'mongodb') {
        mongoose.connect( connectString )
        .then( _ => {
            console.log(`Connected MongoDB Success: ${connectString}`);
        })
        .catch( err => console.error('Connection error:', err));
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database();
        };

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;

