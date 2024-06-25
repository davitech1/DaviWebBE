'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const DOCUMENT_NAME = "Type";
const COLLECTION_NAME = "Type";

// Declare the Schema of the Mongo model
const TypeSchema = new Schema({
    Name: {
        type: Name,
        ref: 'Post',
        required: true
    }
});

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, TypeSchema);
