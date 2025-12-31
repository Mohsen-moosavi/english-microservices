import bcrypt from 'bcryptjs'
import { getOtpKeyForRedis } from './getRediskeys';
import redis from '@/configs/redis';
import { sendMessage } from '@/services/sendMessage';

async function getRandomCode(length:number= 5){
    const digist = "0123456789";
    let otp = "";

    for (let i = 0; i < length; i++) {
        otp += digist[Math.floor(Math.random() * digist.length)];
    }

    //! فعلا این کد به چهار تا یک تبدیل میشه برای تست. بعد از فعال سازی سرویس ارسال اس ام اس، این خط پاک خواهد شد
    otp = "11111";

    const hashedOtp = await bcrypt.hash(otp, 12);

    return {hashedOtp , otp}

}

export const sendOtpToPhone = async (phone:string, length:number = 5, expireTimeInSecound:number = 120) => {
    const {hashedOtp , otp} = await getRandomCode(length);

    await redis.set(getOtpKeyForRedis(phone), hashedOtp, "EX", expireTimeInSecound,);

    sendMessage(phone,otp)
};