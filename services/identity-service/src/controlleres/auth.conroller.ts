import redis from "@/configs/redis";
import { User } from "@/database/models/user.model";
import { Controller } from "@/types/controller";
import { asyncHandler } from "@/utils/asyncController";
import { getCaptchaKeyForRedis, getOtpCooldownKeyForRedis, getOtpCountToSendSmsKeyForRedis, getOtpKeyForRedis, getOtpResendCountKeyForRedis, getPhoneTryTimesForValidateKeyForRedis } from "@/utils/getRediskeys";
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

        if (redisCaptcha !== captcha.toLowerCase().trim()) {
            await redis
                .multi()
                .incr(getPhoneTryTimesForValidateKeyForRedis(phone))
                .expire(getPhoneTryTimesForValidateKeyForRedis(phone), 120)
                .exec();
            return errorResponse(res, 422, "کد امنیتی صحیح نمی باشد.");
        }

        const countToTrySendSms = await redis.get(getOtpCountToSendSmsKeyForRedis(phone));
        if (Number(countToTrySendSms) > 2) {
            return errorResponse(res, 429, "تعداد دفعات مجاز برای درخواست ارسال کد از طریق پیامک به پایان رسیده است، لطفا بعدا تلاش کنید.")
        }

        const otp = await redis.get(getOtpKeyForRedis(phone));
        if (otp) {
            return errorResponse(res, 400, `کد فرستاده شده هنوز منقضی نشده. لفطا مدتی بعد مجددا تلاش کنید.`)
        }

        const oldUser = await User.findOne({
            where: { phone },
            attributes: ["id"]
        })

        if (oldUser) {
            return errorResponse(res, 409, "این شماره قبلا ثبت شده است!");
        }


        await redis
            .multi()
            .set(getOtpCooldownKeyForRedis(phone), 1, "EX", 60)
            .del(getOtpResendCountKeyForRedis(phone))
            .incr(getOtpCountToSendSmsKeyForRedis(phone))
            .expire(getOtpCountToSendSmsKeyForRedis(phone), 600)
            .exec();

        sendOtpToPhone(phone);

        return successResponse(res, 200, `کد با موفقیت ارسال شد`)


    } catch (error) {
        next(error)
    } finally {
        await redis.del(getCaptchaKeyForRedis(uuid));
    }
}


interface resendOtpBody { phone: string }
const resendOtp: Controller<resendOtpBody> = async (req, res, next) => {

    const { phone } = req.body;

    const isOtpExist = await redis.get(getOtpKeyForRedis(phone));
    if (!isOtpExist) {
        return errorResponse(res, 400, "کد منقضی شده است. لطفا دوباره درخواست بدهید.")
    }

    const isCooldown = await redis.get(getOtpCooldownKeyForRedis(phone));
    if (isCooldown) {
        return errorResponse(res, 400, "کد ارسال شده است. لطفا کمی صبر کنید!")
    }

    const resendCount = await redis.get(getOtpResendCountKeyForRedis(phone));
    if (resendCount && Number(resendCount) > 1) {
        return errorResponse(res, 400, "کد منقضی شده است. لطفا دوباره در خواست کنید.");
    }

    await redis
        .multi()
        .incr(getOtpResendCountKeyForRedis(phone))
        .expire(getOtpResendCountKeyForRedis(phone), 180)
        .incr(getOtpCooldownKeyForRedis(phone))
        .expire(getOtpCooldownKeyForRedis(phone), 60)
        .exec();


    const remainingTime = await redis.ttl(getOtpKeyForRedis(phone));

    sendOtpToPhone(phone, undefined, Number(remainingTime))

    return successResponse(res, 200, `کد با موفقیت ارسال شد`);
}

interface getCaptchaBody { uuid?: string }
const getCaptcha = asyncHandler<getCaptchaBody>(async (req, res, next) => {
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

    console.log("uuid:===============================>",newUuid)

    return successResponse(res, 200, 'کد کپچا با موفقیت ایجاد شد.', { uuid: newUuid, captcha: captcha.data })
})

export default {
    sendOtp,
    getCaptcha,
    resendOtp
}