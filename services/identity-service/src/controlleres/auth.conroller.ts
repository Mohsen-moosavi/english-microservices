import redis from "@/configs/redis";
import { User } from "@/database/models/user.model";
import { Controller } from "@/types/controller";
import { asyncHandler } from "@/utils/asyncController";
import { getAttemptToVerifyOtpKeyForRedis, getBannedPhoneForVerifyOtpKeyForRedis, getCaptchaKeyForRedis, getOtpCooldownKeyForRedis, getOtpCountToSendSmsKeyForRedis, getOtpKeyForRedis, getOtpResendCountKeyForRedis, getPhoneTryTimesForValidateKeyForRedis, getVerifiedPhoneKeyForRedis } from "@/utils/getRediskeys";
import { sendOtpToPhone } from "@/utils/redisFuncs";
import { errorResponse, successResponse } from "@/utils/responses";
import svgCpatcha from "svg-captcha";
import uuid from "uuid"
import bcrypt from 'bcryptjs'
import { randomInt } from "crypto";
const uuidv4 = uuid.v4;



interface sendOtpBody { phone: string, captcha: string, uuid: string }
const sendOtp: Controller<sendOtpBody> = async (req, res, next) => {

    const { phone, captcha, uuid } = req.body;

    try {
        const timesToTryValidatePhone = await redis.get(getPhoneTryTimesForValidateKeyForRedis(phone))
        if (Number(timesToTryValidatePhone) > 3) {
            return errorResponse(res, 429, "لطفا چند دقیقه دیگر دوباره تلاش کنید.")
        }

        const isBanned = await redis.get(getBannedPhoneForVerifyOtpKeyForRedis(phone));
        if(isBanned){
            return errorResponse(res,423,"لطفا چند دقیقه بعد، مجددا تلاش کنید.")
        }

        const redisCaptcha = await redis.get(getCaptchaKeyForRedis(uuid));

        if (redisCaptcha !== captcha.toLowerCase().trim()) {
            await redis
                .multi()
                .incr(getPhoneTryTimesForValidateKeyForRedis(phone))
                .expire(getPhoneTryTimesForValidateKeyForRedis(phone), 120)
                .exec();
            return errorResponse(res, 400, "کد امنیتی صحیح نمی باشد.");
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
const resendOtp: Controller<resendOtpBody> = async (req, res) => {

    const { phone } = req.body;

    const isOtpExist = await redis.get(getOtpKeyForRedis(phone));
    if (!isOtpExist) {
        return errorResponse(res, 410, "کد منقضی شده است. لطفا دوباره درخواست بدهید.")
    }

    const isCooldown = await redis.get(getOtpCooldownKeyForRedis(phone));
    if (isCooldown) {
        return errorResponse(res, 400, "کد ارسال شده است. لطفا کمی صبر کنید!")
    }

    const resendCount = await redis.get(getOtpResendCountKeyForRedis(phone));
    if (resendCount && Number(resendCount) > 1) {
        return errorResponse(res, 410, "کد منقضی شده است. لطفا دوباره در خواست کنید.");
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
const getCaptcha = asyncHandler<getCaptchaBody>(async (req, res) => {
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


interface verifyOtpBody { phone:string, code: string }
const verifyCode = asyncHandler<verifyOtpBody>(async (req, res) => {

    const { phone, code } = req.body;

    const isBanned = await redis.get(getBannedPhoneForVerifyOtpKeyForRedis(phone));
    if(isBanned){
        return errorResponse(res,423,"لطفا چند دقیقه بعد، مجددا تلاش کنید.")
    }



    const attemptsToVerifyOtp = await redis.incr(getAttemptToVerifyOtpKeyForRedis(phone));

    if (attemptsToVerifyOtp === 1) {
        await redis.expire(getAttemptToVerifyOtpKeyForRedis(phone), 300);
    }
    if (Number(attemptsToVerifyOtp) > 4) {
      await redis.set(getBannedPhoneForVerifyOtpKeyForRedis(phone), 1, 'EX', 300);
      return errorResponse(res, 429, "تعداد دفعات مجاز برای وارد کردن کد، به پایان رسیده است.")
    }



    const savedOtp = await redis.get(getOtpKeyForRedis(phone));
    if (!savedOtp) {
      return errorResponse(res, 410, "کد منقضی شده است. لطفا دوباره درخواست کنید!");
    }




    const otpIsCorrect = await bcrypt.compare(code, savedOtp);

    if (!otpIsCorrect) {
      return errorResponse(res, 400, "کد نادرست است!");
    }




    const randomCode = randomInt(100000, 999999);
    await redis.multi()
        .set(getVerifiedPhoneKeyForRedis(phone), randomCode, "EX", 10 * 60)
        .del(getOtpKeyForRedis(phone))
        .del(getAttemptToVerifyOtpKeyForRedis(phone))
        .exec();




    return successResponse(res, 200, "شماره تلفن با موفقیت احراز شد", { verifiedPhoneCode:randomCode });
})

export default {
    sendOtp,
    getCaptcha,
    resendOtp,
    verifyCode
}