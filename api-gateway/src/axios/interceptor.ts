import { generateGetwatSecretToken } from "@/utils/jwt";
import { Response } from "express";

export function attachGatewayInterceptors(client: any) {
  client.interceptors.request.use((config: any) => {

    const gatewayToken = generateGetwatSecretToken(config.metadata?.user);

    config.headers = {
      ...(config.headers || {}),
      "x-apigateway-token": gatewayToken,
    };


    return config;
  });

  // client.interceptors.response.use(
  //   (res: Response) => res,
  //   (error: any) => {
  //     return Promise.reject(error);
  //   }
  // );
}
