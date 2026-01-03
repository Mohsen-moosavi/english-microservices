export enum RedisService {
    IDENTITY = "identity",
    CONTENT = "content",
    CONTACT = "contact",
}

export enum RedisModule {
    CAPTCHA = "captcha",
    OTP = "otp",
    USER = "user",
}

export enum RedisEntity {
    BANNED_PHON = "ban",
    VALIDATE_PHONE_TIMES = "validatePhoneTimes",
    ATTEMPT_TOVALIDATE_OTP = "attemptToValidateOtp",
    COOLDOWN = "cooldown",
    RESEND = "resend",
    SENDSMS = "sendSms",
    VERIFIED = "verified",

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