import "reflect-metadata";

import { DataSource } from "typeorm";

import { AddrsDistanceHistory, Model } from "../entities";
import {
  getPostgresDBHost,
  getPostgresDBName,
  getPostgresDBPassword,
  getPostgresDBPort,
  getPostgresDBUser,
} from "../utils";

const postgresConfig = {
  host: getPostgresDBHost(),
  port: parseInt(getPostgresDBPort()),
  username: getPostgresDBUser(),
  password: getPostgresDBPassword(),
  database: getPostgresDBName(),
};

const PostgresDataSource = new DataSource({
  ...postgresConfig,
  type: "postgres",
  synchronize: false,
  logging: false,
  entities: [Model, AddrsDistanceHistory],
});

export { PostgresDataSource };
