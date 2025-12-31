import { configs } from '@/configs/env.config'
import { AuthUser } from '@/types/request';
import jwt from 'jsonwebtoken'

interface JwtPayloadCustom {
    id: string;
    role: string;
    permissions: string[]
}

export function verifyAccessToken(token: string) {
    try {
        return jwt.verify(token, configs.auth.jwtSecret) as JwtPayloadCustom;
    } catch (error) {
        return false
    }
}


export function generateGetwatSecretToken(user: AuthUser|undefined) {
    const expiresIn: number = configs.auth.apiGatewaySecretExpireTimeInSecound as number;
    const secretKey: string = configs.auth.apiGatewaySecret!

    if (user) {
        return jwt.sign({ userId : user.id, role : user.role, permissions:user.permissions, tokenType: "gateway" }, secretKey, {
            expiresIn,
        })
    } else {
        return jwt.sign({tokenType: "gateway" }, secretKey, {
            expiresIn:100000000000000000,
        })
    }
}