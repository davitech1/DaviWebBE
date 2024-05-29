'use strict'

const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const { getInfoData } = require('../utils');
const { findByName } = require('./user.service');
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../configs/config.JWT')

const RoleUser = {
    USER: 'USER',
    ADMIN: 'ADMIN',
}

class AccessService {
    static login = async ({ name, password }) => {
        try {
            const foundUser = await findByName({ name })
            if(!foundUser) return 'User not registered'
            
            const match = bcrypt.compare(password, foundUser.password)
            if(!match){ 
                return 'Authentication Error'
            } 
            const token = jwt.sign({ idUser: foundUser._id, name }, SECRET_KEY, { expiresIn: '1h' });
            return {
                code: 200,
                user: getInfoData({ fields: ['_id', 'name'], obj: foundUser}),
                token
                
            }           
        } catch (error) {
            console.log( error.message )
            return {
                code: 500,
                message: 'Internal Server'
            }          
        }     
       
    }

    static signUp = async ({ name, password}) => {
        try {
            //step 1: check name exists?
            const holderName = await userModel.findOne({ name }).lean();
            if( holderName){
                return 'Error: User already registered'
            }

            //step 2: create new user
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({
                name, password: passwordHash, roles: [RoleUser.ADMIN]
            });
 
            if( newUser ){
                const token = jwt.sign({ userId: newUser._id , name }, SECRET_KEY, { expiresIn: '1day' });
                console.log(`Create token success::`, token)
                // const decoded = jwt.decode(token);
                // console.log('Decode token::', decoded);
                return {
                    code: 201,
                    metadata: {
                        user: getInfoData({ fields: ['_id', 'name'], obj: newUser}),
                        token
                    }
                }
            }
            return {
                code: 200,
                metadata: null
            }
        } catch (error) {
            console.log( error.message )
            return {
                code: 500,
                message: 'Internal Server'
            }
        }      
    }
}


module.exports = AccessService;