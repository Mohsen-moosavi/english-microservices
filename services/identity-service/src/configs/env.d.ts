
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      API_GATEWAY_SECRET: string;
      PORT: str,
      CORS_ORIGIN: String,
      DB_HOST: string,
      DB_PORT: string,
      DB_NAME: string,
      DB_USER: string,
      DB_PASSWORD: string,
      DB_DIALECT: sting,
      DB_POOL_SIZE: number
    }
  }
}
