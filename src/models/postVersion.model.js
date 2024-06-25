'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const DOCUMENT_NAME = "PostVersion";
const COLLECTION_NAME = "post_versions";

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
    title: {
        type: String,
        required: true
    },
    body: {
        type: [
            {
                paragraph: { type: String, required: true }
            }
        ],
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
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, postVersionSchema);
