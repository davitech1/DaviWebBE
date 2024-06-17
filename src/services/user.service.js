'use strict'

const userModel = require('../models/user.model');

const findByName = async ({ name, select = { name: 1, password: 1, roles: 1, status: 1 }}) => {
    return await userModel.findOne({ name }).select(select);
};

class UserService {
    static findByName = findByName;
}

module.exports = UserService;
