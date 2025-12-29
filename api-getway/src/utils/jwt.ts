import { configs } from '@/configs/env.config'
import jwt from 'jsonwebtoken'

interface JwtPayloadCustom {
    id: string;
    role: string;
    permissions : string[]
}

export function verifyAccessToken(token: string) {
    try {
        return jwt.verify(token, configs.auth.jwtSecret) as JwtPayloadCustom;
    } catch (error) {
        return false
    }
}


export function generateGetwatSecretToken(userId:string , role:string , permissions: string[]){
    const expiresIn : number = configs.auth.apiGatewaySecretExpireTimeInSecound as number;
    const secretKey : string = configs.auth.apiGatewaySecret!
    return jwt.sign({ userId , role , permissions , tokenType: "gateway"}, secretKey, {
        expiresIn,
    })
}