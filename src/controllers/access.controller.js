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
    logout = async (req, res) => {
        return res.status(200).json({ message: 'Log out successfully' });
    }
}
module.exports = new AccessController();