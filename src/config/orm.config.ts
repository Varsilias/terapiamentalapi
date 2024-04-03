import "reflect-metadata";
import { DataSourceOptions } from "typeorm";
import { EnvConfig } from "./env.config";
import { join } from "path";

const config = new EnvConfig();

export const ormConfig: DataSourceOptions = {
  type: "postgres",
  ...(config.inProduction
    ? { url: config.DB_URL }
    : {
        username: config.DB_USER,
        host: config.inProduction ? config.DB_HOST : "postgres",
        password: config.DB_PASSWORD,
        port: config.DB_PORT,
        database: config.DB_NAME,
      }),
  entities: [join(__dirname + "/../", "**", "", "*.entity.{ts,js}")],
  synchronize: config.DB_SYNC,
  logging: !config.inProduction ? ["error", "migration", "warn"] : false,
  ssl: !config.inProduction ? false : { rejectUnauthorized: false },
};
