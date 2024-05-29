'use strict'

const { SECRET_KEY } = require('../configs/config.JWT')
const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
    console.log(req, 1111111 )
    const token = req.headers('authorization');

    if (!token) {
      return res.sendStatus(403);
    }
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
};

module.exports = {
    authenticateJWT
}