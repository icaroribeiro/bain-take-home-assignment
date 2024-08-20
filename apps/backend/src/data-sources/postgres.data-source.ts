import "reflect-metadata";

import { DataSource } from "typeorm";

import { DistsBtwAddrsHistEntity as AddressesDistanceCalc } from "../api/entities";
import { BaseEntity as Base } from "../api/entities";
import {
  getPostgresDBHost,
  getPostgresDBName,
  getPostgresDBPassword,
  getPostgresDBPort,
  getPostgresDBUser,
} from "../config/postgres-database";

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
  synchronize: true,
  logging: false,
  entities: [Base, AddressesDistanceCalc],
});

export { PostgresDataSource };
