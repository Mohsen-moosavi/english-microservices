import redis from "@/configs/redis";
import { User } from "@/database/models/user.model";
import { Controller } from "@/types/controller";
import { asyncHandler } from "@/utils/asyncController";
import { getCaptchaKeyForRedis, getOtpKeyForRedis, getPhoneTryTimesForValidateKeyForRedis } from "@/utils/getRediskeys";
import { sendOtpToPhone } from "@/utils/redisFuncs";
import { errorResponse, successResponse } from "@/utils/responses";
import svgCpatcha from "svg-captcha";
const uuidv4 = require("uuid").v4;


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

        return successResponse(res, 200, `کد با موفقیت ارسال شد`)


    } catch (error) {
        next(error)
    } finally {
        await redis.del(getCaptchaKeyForRedis(uuid));
    }
}

interface getCaptchaBody { uuid?: string }
const getCaptcha = asyncHandler<getCaptchaBody>(async (req,res,next)=>{
    const { uuid } = req.body;

    if (uuid) {
      await redis.del(getCaptchaKeyForRedis(uuid));
    }


    const captcha = svgCpatcha.create({
      size: 5,
      noise: 5,
      fontSize: 50,
      width: 100,
      height: 50,
    });

    const newUuid = uuidv4();

    await redis.set(getCaptchaKeyForRedis(newUuid), captcha.text.toLowerCase(), "EX", 60 * 5);

    return successResponse(res, 200, 'کد کپچا با موفقیت ایجاد شد.', { uuid: newUuid, captcha: captcha.data })
}) 

export default {
    sendOtp,
    getCaptcha
}