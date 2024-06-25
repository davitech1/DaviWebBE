'use strict'

const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    console.log('Token:', token);  
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        console.log('Decoded:', decoded);  // In ra giá trị decoded để kiểm tra
        next();
    } catch (err) {
        console.log('JWT Verify Error:', err.message);  // In ra lỗi xác minh JWT
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateJWT;
