declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      JWT_SECRET: string;
      PORT:number,
      CORS_ORIGIN:string,
      SWAGGER_UI_URL:string
      API_GATEWAY_SECRET:string,
      API_GAEWAY_SECRET_EXPIRE_TIME_IN_SECOUND:number,
      IDENTITY_SERVICE:string
    }
  }
}
