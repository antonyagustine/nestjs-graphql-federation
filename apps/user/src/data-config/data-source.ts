import path from "path";
import dotEnv from "dotenv";
import { DataSource } from "typeorm";

import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

dotEnv.config({
  path: path.resolve(process.cwd(), ".env.development.local"),
});

const requiredEnv = ["DB_TYPE", "DB_HOST", "DB_USERNAME", "DB_PASSWORD", "DB_NAME"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const isDev = process.env.NODE_ENV === "development";

export const dataSourceOptions: PostgresConnectionOptions = {
  type: (process.env.DB_TYPE as PostgresConnectionOptions['type']) ?? "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
  synchronize: false,
  logging: isDev,
  connectTimeoutMS: 120_000,
  entities: [path.resolve("dist/apps/user/contexts/infrastructure/database/models/**/*.model.js")],
  migrations: [path.resolve("dist/apps/user/migrations/*.js")]
};

export default new DataSource(dataSourceOptions)
