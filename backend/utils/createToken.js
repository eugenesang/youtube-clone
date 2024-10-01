import jwt from 'jsonwebtoken'

export async function createToken(id){
    return await jwt.sign({id}, process.env.tokenSecret, {expiresIn: '3d'})
}