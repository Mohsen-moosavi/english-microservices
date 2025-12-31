import { SecurityLog } from "@/database/models/securityLog.model";
import { decodeApiGatewayToken } from "./jwt";
import { User } from "@/database/models/user.model";

export const insecureRequestHandler = async (apiGatewayToken: string , ip:string | undefined) => {

    const decode = decodeApiGatewayToken(apiGatewayToken);

    const userId = decode?.userId ? Number(decode.userId) : undefined;

    const insecureUser = userId ? await User.findOne({where:{id : userId}}) : null;

    setSecureLog(insecureUser?.id,ip , "INVALID_GATEWAY_SECRET" , "invalid x-internal-secret" )

}

export async function setSecureLog(userId: number | undefined,ip:string | undefined , action:string  , details:string ){
    await SecurityLog.create({
        ip: ip ?? null,
        action,
        details,
        userId: userId ?? null,
    });
}