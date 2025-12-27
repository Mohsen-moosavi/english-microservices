import { Dialect, Sequelize } from "sequelize";
import { configs } from "./env.config";

export const db = new Sequelize({
    host: configs.db.host!,
    port: Number(configs.db.port),
    username: configs.db.user!,
    password: configs.db.password!,
    database: configs.db.name!,
    dialect: configs.db.dialect! as Dialect,
    logging: configs.isProduction ? false : console.log,
  });