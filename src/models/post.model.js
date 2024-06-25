'use strict'

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const DOCUMENT_NAME = "Post";
const COLLECTION_NAME = "posts";

// Declare the Schema of the Mongo model
const postSchema = new Schema({
    post_id: {
        type: Number,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    type: {
        type: String,
        required:true
    },
    version: {
        type: Number,
        required: true,
        default: 1
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

// Apply the auto-increment plugin to the postSchema
postSchema.plugin(AutoIncrement, { inc_field: 'post_id' });

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, postSchema);
