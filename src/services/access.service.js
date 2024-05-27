'use strict'

const userModel = require('../models//user.model');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utills');
const { findByEmail } = require('./user.service');

const RoleShop = {
    USER: 'USER',
    ADMIN: 'ADMIN',
}

class AccessService {
    static login = async ({email, password, refreshToken = null}) => {
        
        const foundUser = await findByEmail({email})
        if(!foundUser) throw new BadRequestError('User not registered')
        
        const match = bcrypt.compare(password, foundUser.password)
        if(!match){ 
            return 'Authentication Error'
        } 
        
        const { _id: userId} = foundUser
        const tokens = await createTokenPair({userId, email}, publicKey, privateKey)
        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId
        })
        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], obj: foundUser}),
            tokens
            
        }
        
    }

    static signUp = async ({ name, email, password}) => {
        
            //step 1: check email exists?
            const holderShop = await userModel.findOne({ email}).lean();
            if( holderShop){
                throw new BadRequestError('Error: Shop already registered')
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await userModel.create({
                name, email, password: passwordHash, roles: [RoleShop.ADMIN]
            });

        if(newShop){
        const publicKey = crypto.randomBytes(64).toString();
        const privateKey = crypto.randomBytes(64).toString();
            // console.log( publicKey)
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })

            console.log(`keyStore::`,keyStore)
            
            if( !keyStore){
                return {
                    code: 'xxxx',
                    messsage: 'keyStore error'
                }
            } 
            // create token pair
            // const publicKeyObj = crypto.createPublicKey( publicKeyString)
            const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey)
            console.log('Create token success::', tokens)
            
            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ fields: ['_id', 'name', 'email'], obj: newShop}),
                    tokens
                }
            }
        }
        return {
            code: 200,
            metadata: null
        }
            
    }
}

module.exports = AccessService;