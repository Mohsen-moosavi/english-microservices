import { asyncHandler } from "@/utils/asyncController";

const sendOtp = asyncHandler((req, res, next) => {

    const validationError = validationResult(req)

    if (validationError?.errors && validationError?.errors[0]) {
        return errorResponse(res, 400, validationError.errors[0].msg)
    }

    const { phone, captcha, uuid } = req.body;

    const redisCaptcha = await redis.get(`captcha:${uuid}`)
    if (redisCaptcha !== captcha) {
        await redis.del(`captcha:${uuid}`)
        return errorResponse(res, 422, "کد امنیتی اشتباه است.")
    }

    const banPhone = await Ban.findOne({
        attributes: ["id"],
        where: { phone }
    })

    if (banPhone) {
        await redis.del(`captcha:${uuid}`)
        return errorResponse(res, 422, "این شماره تلفن، مسدود شده است!")
    }

    const oldUser = await User.findOne({
        attributes: ["id"],
        where: { phone }
    })

    if (oldUser) {
        await redis.del(`captcha:${uuid}`)
        return errorResponse(res, 409, "این شماره تلفن، قبلا ثبت شده است!")
    }

    const banPhoneForVerified = await redis.get(getBannedPhonePattern(phone))

    if (banPhoneForVerified) {
        await redis.del(`captcha:${uuid}`)
        return errorResponse(res, 429, "لطفا بعدا تلاش کنید.")
    }

    const { expired, remainingTime } = await getOtpDetails(phone)

    if (!expired) {
        return errorResponse(res, 400, `کد فرستاده شده هنوز منقضی نشده. لفطا بعد از ${remainingTime} دقیقه دیگر مجددا تلاش کنید.`);
    }

    const otp = await generateOtp(phone);

    await sendSMSOtp(phone, otp);

    return successResponse(res, 200, `کد با موفقیت ارسال شد`);


})

export default {
    sendOtp
}