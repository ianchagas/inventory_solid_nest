import * as dotenv from 'dotenv';
import fs from 'fs';
import { DataSource, getMetadataArgsStorage } from 'typeorm';

dotenv.config();
const config = {
  type: process.env.TYPEORM_CONNECTION as any,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
  migrations: [process.env.TYPEORM_MIGRATIONS],
  keepConnectionAlive: true,
  maxQueryExecutionTime: 1000,
  migrationsRun: true,
  synchronize: false,
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    entitiesDir: '',
  },
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
};

export const dataSource = new DataSource(config);
