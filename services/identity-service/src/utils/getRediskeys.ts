import { RedisEntity, redisKey, RedisModule, RedisService } from "@/types/redis";

export const getCaptchaKeyForRedis = (uuid:string) => {
    return redisKey(
        RedisService.IDENTITY,
        RedisModule.CAPTCHA,
        uuid
    )
}

export const getPhoneTryTimesForValidateKeyForRedis = (phone:string) => {
    return redisKey(
        RedisService.IDENTITY,
        RedisModule.CAPTCHA,
        phone,
        RedisEntity.VALIDATE_PHONE_TIMES
    );
}

export const getOtpKeyForRedis = (phone:string) => {
    return redisKey(
        RedisService.IDENTITY,
        RedisModule.OTP,
        phone
    );
}

export const getAttemptToVerifyOtpKeyForRedis = (phone:string) => {
    return redisKey(
        RedisService.IDENTITY,
        RedisModule.OTP,
        phone,
        RedisEntity.ATTEMPT_TOVALIDATE_OTP
    );
}

export const getBannedPhoneForVerifyOtpKeyForRedis = (phone:string) => {
    return redisKey(
        RedisService.IDENTITY,
        RedisModule.OTP,
        phone,
        RedisEntity.BANNED_PHON
    );
}

export const getOtpCooldownKeyForRedis = (phone:string) => {
    return redisKey(
        RedisService.IDENTITY,
        RedisModule.OTP,
        phone,
        RedisEntity.COOLDOWN
    );
}

export const getOtpResendCountKeyForRedis = (phone:string) => {
    return redisKey(RedisService.IDENTITY,
        RedisModule.OTP,
        phone,
        RedisEntity.RESEND
    );
}

export const getOtpCountToSendSmsKeyForRedis = (phone:string) => {
    return redisKey(RedisService.IDENTITY,
        RedisModule.OTP,
        phone,
        RedisEntity.SENDSMS
    );
}

export const getVerifiedPhoneKeyForRedis = (phone:string) => {
    return redisKey(
        RedisService.IDENTITY,
        RedisModule.OTP,
        phone,
        RedisEntity.VERIFIED
    );
}