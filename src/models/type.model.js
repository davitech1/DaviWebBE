'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const DOCUMENT_NAME = "Type";
const COLLECTION_NAME = "types"; 

// Declare the Schema of the Mongo model
const TypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    collection: COLLECTION_NAME
});

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, TypeSchema);
