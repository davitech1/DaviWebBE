'use strict'

const AccessService = require("../services/access.service");

class AccessController {

    login = async ( req, res, next) => {
        try {
            console.log(req.body)
            return res.status(200).json( await AccessService.login( req.body ))
        } catch (error) {
            console.log(error)
        }
      
    }
    signUp = async ( req, res, next) => {
        try {
            return res.status(200).json( await AccessService.signUp( req.body ))
        } catch (error) {
            console.log(error)
        }
    }
    static logout = async (req, res) => {
        try {
            const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Access denied. No token provided.' });
            }

            await AccessService.logout(token);
            return res.status(204).send();
        } catch (error) {
            console.log('Logout error: ', error.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
module.exports = new AccessController();