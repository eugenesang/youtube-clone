import jwt from 'jsonwebtoken'

export async function createToken(id){
    return await jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}