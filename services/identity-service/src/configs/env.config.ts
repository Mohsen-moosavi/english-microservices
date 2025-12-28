export const configs = {
  isProduction: process.env.NODE_ENV === "production",

  auth: {
    apiGatewaySecret: process.env.API_GATEWAY_SECRET || 'default_secret',
  },
  url: {
    port: process.env.PORT,
    corsOrigin: process.env.CORS_ORIGIN
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    poolSize: process.env.DB_POOL_SIZE || 10,
  }
};
