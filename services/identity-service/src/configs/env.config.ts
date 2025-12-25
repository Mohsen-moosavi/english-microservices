export const configs = {
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'default_secret',
  },
  url:{
    port: process.env.PORT,
    corsOrigin: process.env.CORS_ORIGIN
  }
};
