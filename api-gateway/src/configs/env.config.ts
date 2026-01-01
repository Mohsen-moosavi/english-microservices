export const configs = {
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'default_secret',
    apiGatewaySecret: process.env.API_GATEWAY_SECRET || "default_internal_secret",
    apiGatewaySecretExpireTimeInSecound: process.env.API_GATEWAY_SECRET_EXPIRE_TIME_IN_SECOUND || 600
  },
  url:{
    port: process.env.PORT,
    corsOrigin: process.env.CORS_ORIGIN,
    swaggerUiUrl: process.env.SWAGGER_UI_URL
  },
  serviceUrl:{
    identityService: process.env.IDENTITY_SERVICE
  }

};
