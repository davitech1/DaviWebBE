'use strict'

const mongoose = require('mongoose'); // Đảm bảo rằng mongoose được yêu cầu trước
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

// Declare the Schema of the Mongo model    
const userSchema = new Schema({
    admin_id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 150,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    roles: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

// Apply the auto-increment plugin to the userSchema.
userSchema.plugin(AutoIncrement, { inc_field: 'admin_id' });

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
