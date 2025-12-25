import { configs } from '@/configs/env.config'
import jwt from 'jsonwebtoken'

interface JwtPayloadCustom {
  sub: string;
  role: string;
}

export function verifyAccessToken(token:string){
    try {
        return jwt.verify(token,configs.auth.jwtSecret) as JwtPayloadCustom;        
    } catch (error) {
        return false
    }
}