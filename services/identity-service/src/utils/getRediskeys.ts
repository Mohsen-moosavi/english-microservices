import { redisKey, RedisModule, RedisService } from "@/types/redis";

export const getCaptchaKeyForRedis = (uuid:string) => {
    return redisKey(RedisService.IDENTITY, RedisModule.CAPTCHA, uuid)
}

export const getPhoneTryTimesForValidateKeyForRedis = (phone:string) => {
    return redisKey(RedisService.IDENTITY, RedisModule.VALIDATE_PHONE_TIMES,phone);
}

export const getOtpKeyForRedis = (phone:string) => {
    return redisKey(RedisService.IDENTITY, RedisModule.OTP,phone);
}