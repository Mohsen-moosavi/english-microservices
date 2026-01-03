import z from "../../generateZodInstance";


export const getSuccessResponseSchema = <T>(status: number, message: string , data?:T) => {
    return z.object({
        success: z
            .boolean()
            .openapi({ example: true }),
        status: z
            .number()
            .openapi({ example: status }),
        message: z
            .string()
            .openapi({ example: message }),
        data: z.object({}).openapi({example:data, default:{}}).optional()
    })
}