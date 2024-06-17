'use strict'

const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const { getInfoData } = require('../utils');
const { findByName } = require('../services/user.service'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_KEY;

const RoleUser = {
    USER: 'USER',
    ADMIN: 'ADMIN',
}

class AccessService {
    static login = async ({ name, password }) => {
        try {
            const foundUser = await findByName({ name });
            if (!foundUser) return { code: 401, message: 'User not registered' };

            const match = await bcrypt.compare(password, foundUser.password);
            if (!match) { 
                return { code: 401, message: 'Authentication Error' };
            }

            if (foundUser.status === 'inactive') {
                foundUser.status = 'active';
            }
            await foundUser.save();

            const token = jwt.sign({ idUser: foundUser._id, name }, SECRET_KEY, { expiresIn: '1h' });
            return {
                code: 200,
                user: getInfoData({ fields: ['_id', 'name', 'status'], obj: foundUser }),
                token
            };
        } catch (error) {
            console.error(error.message); // Ghi lại lỗi
            return {
                code: 500,
                message: 'Internal Server Error'
            };
        }
    }

    static signUp = async ({ name, password }) => {
        try {
            const holderName = await userModel.findOne({ name }).lean();
            if (holderName) {
                return { code: 400, message: 'Error: User already registered' };
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({
                name, password: passwordHash, roles: [RoleUser.USER]
            });

            if (newUser) {
                const token = jwt.sign({ userId: newUser._id, name }, SECRET_KEY, { expiresIn: '1h' });
                return {
                    code: 201,
                    metadata: {
                        user: getInfoData({ fields: ['_id', 'name'], obj: newUser }),
                        token
                    }
                };
            }
            return {
                code: 200,
                metadata: null
            };
        } catch (error) {
            console.error(error.message); // Ghi lại lỗi
            return {
                code: 500,
                message: 'Internal Server Error'
            };
        }
    }
}

module.exports = AccessService;
