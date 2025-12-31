export enum RedisService {
    IDENTITY = "identity",
    CONTENT = "content",
    CONTACT = "contact",
}

export enum RedisModule {
    CAPTCHA = "user",
    VALIDATE_PHONE_TIMES = "validatePhoneTimes",
    OTP = "otp",
    USER = "user",
}

export enum RedisEntity {
    BAN = "ban",
}

// export enum RedisUserKeyType {
//     PROFILE = "profile",
//     PERMISSIONS = "permissions",
//     CART = "cart",
// }

export function redisKey(
    service: RedisService,
    module: RedisModule,
    entityId: string | number | RedisEntity,
    keyType?: string,
    extra?: string
) {
    const parts = [service, module, entityId.toString()];
    if (keyType) parts.push(keyType);
    if (extra) parts.push(extra);
    return parts.join(":");
}