import redis from "@/configs/redis";
import { User } from "@/database/models/user.model";
import { Controller } from "@/types/controller";
import { getCaptchaKeyForRedis, getOtpKeyForRedis, getPhoneTryTimesForValidateKeyForRedis } from "@/utils/getRediskeys";
import { sendOtpToPhone } from "@/utils/redisFuncs";
import { errorResponse } from "@/utils/responses";


interface sendOtpBody { phone: string, captcha: string, uuid: string }
const sendOtp: Controller<sendOtpBody> = async (req, res, next) => {

    const { phone, captcha, uuid } = req.body;

    try {
        const timesToTryValidatePhone = await redis.get(getPhoneTryTimesForValidateKeyForRedis(phone))
        if (Number(timesToTryValidatePhone) > 3) {
            return errorResponse(res, 429, "لطفا چند دقیقه دیگر دوباره تلاش کنید.")
        }

        const redisCaptcha = await redis.get(getCaptchaKeyForRedis(uuid));

        if (redisCaptcha !== captcha) {
            await redis.incr(getPhoneTryTimesForValidateKeyForRedis(phone))
            await redis.expire(getPhoneTryTimesForValidateKeyForRedis(phone),120)
            return errorResponse(res, 422, "کد امنیتی صحیح نمی باشد.");
        }


        const oldUser = await User.findOne({
            where: { phone },
            attributes: []
        })

        if (oldUser) {
            return errorResponse(res, 409, "این شماره قبلا ثبت شده است!");
        }

        const otp = await redis.get(getOtpKeyForRedis(phone));
        if(otp){
            const remainingTime = await redis.ttl(getOtpKeyForRedis(phone));
            return errorResponse(res,400,`کد فرستاده شده هنوز منقضی نشده. لفطا بعد از ${remainingTime} ثانیه دیگر مجددا تلاش کنید.`)
        }

        sendOtpToPhone(phone);


    } catch (error) {
        next(error)
    } finally {
        await redis.del(getCaptchaKeyForRedis(uuid));
    }
}

export default {
    sendOtp
}