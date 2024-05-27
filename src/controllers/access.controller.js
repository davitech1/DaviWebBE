'use strict'

const { CREATED, SuccessResuest } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
    login = async ( req, res, next) => {
        try {
            
        } catch (error) {
            
        }
        new SuccessResuest({
            metadata: await AccessService.login( req.body )
        }).send(res)
    }
    signUp = async ( req, res, next) => {
           new CREATED({
            message: 'Registered OK',
            metadata: await AccessService.signUp( req.body )
           }).send(res)
    }
}
module.exports = new AccessController();