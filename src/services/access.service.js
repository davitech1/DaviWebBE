'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.model');

require('dotenv').config();

class AccessService {
    static async login({ name, password }) {
        try {
            const foundAdmin = await Admin.findOne({ name });
            if (!foundAdmin) return { code: 401, message: 'Admin not registered' };

            const match = await bcrypt.compare(password, foundAdmin.password);
            if (!match) { 
                return { code: 401, message: 'Authentication Error' };
            }

            const token = jwt.sign(
                { idAdmin: foundAdmin._id, name }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            );
            foundAdmin.status = 'active';
            await foundAdmin.save();

            return {
                code: 200,
                admin: { _id: foundAdmin._id, name: foundAdmin.name },
                token
            };
        } catch (error) {
            console.log(error.message);
            return {
                code: 500,
                message: 'Internal Server Error'
            };
        }
    }

    static async signUp({ name, password }) {
        try {
            const holderName = await Admin.findOne({ name }).lean();
            if (holderName) {
                return { code: 400, message: 'Error: Admin already registered' };
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newAdmin = await Admin.create({
                name, password: passwordHash, roles: ['ADMIN']
            });

            const token = jwt.sign(
                { idAdmin: newAdmin._id, name }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            );
            await newAdmin.save();

            return {
                code: 201,
                metadata: {
                    admin: { _id: newAdmin._id, name: newAdmin.name },
                    token
                }
            };
        } catch (error) {
            console.log(error.message);
            return {
                code: 500,
                message: 'Internal Server Error'
            };
        }
    }
    
}

module.exports = AccessService;
