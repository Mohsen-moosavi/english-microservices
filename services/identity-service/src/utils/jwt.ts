import { configs } from "@/configs/env.config";
import { appPermission } from "@/types/permission";
import jwt from "jsonwebtoken";

interface JwtPayloadCustom {
    userid: string;
    role: string;
    permissions: appPermission[],
    tokenType: string;
}

interface InsecureJwtPayloadCustom {
    userId: string | undefined;
}

export function verifyApiGatewayToken(token: string) {
    try {
        return jwt.verify(token, configs.auth.apiGatewaySecret) as JwtPayloadCustom;
    } catch (error) {
        return false
    }
}

export function decodeApiGatewayToken(token:string) {
    try {
        return jwt.decode(token) as InsecureJwtPayloadCustom;
    } catch {
        return null;
    }
}

