'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const DOCUMENT_NAME = 'RevokedToken';
const COLLECTION_NAME = 'RevokedTokens';

const revokedTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    revokedAt: {
        type: Date,
        default: Date.now,
        expires: 3600 
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, revokedTokenSchema);
