'use strict'

const{ model, Schema} = require('mongoose');
const DOCUMENT_NAME = "Customer";
const COLLECTION_NAME = "Customer";

const customerSchema = new Schema({
    email: { 
        type: String, 
        required: true 
    },
    number: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true },
    ip: { 
        type: String, 
        required: true },
    id_post_view: { 
        type: String, 
        default: '1' 
    },
    view_at: { 
        type: Date, 
        default: Date.now }
});

module.exports = model(DOCUMENT_NAME,customerSchema);