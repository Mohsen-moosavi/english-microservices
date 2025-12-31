import { createServiceClient } from "./baseClient";
import { attachGatewayInterceptors } from "./interceptor";

export const getIdentityClient = (isMultypartContent?: boolean) => {
    const identityClient = createServiceClient(
        isMultypartContent
    );

    attachGatewayInterceptors(identityClient);

    return identityClient;
}