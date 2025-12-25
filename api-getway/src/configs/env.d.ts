declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      JWT_SECRET: string;
      PORT:number,
      CORS_ORIGIN:string,
      INTERNAL_SECRET:string
    }
  }
}
