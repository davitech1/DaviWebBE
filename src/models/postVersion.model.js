'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const DOCUMENT_NAME = "PostVersion";
const COLLECTION_NAME = "PostVersion";

// Declare the Schema of the Mongo model
const postVersionSchema = new Schema({
    post_id: {
        type: Number,
        ref: 'Post',
        required: true
    },
    update_by: {
        type: String,
        ref: 'Admin',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    abstract: {
        type: String
    },
    body:{
        type: String,
        required: true
    },
    image: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    version: {
        type: Number,
        required: true
    }
});

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, postVersionSchema);
