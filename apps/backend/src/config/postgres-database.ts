import { getEnvVar } from "../utils";

function getPostgresDBDriver(): string {
  return getEnvVar("POSTGRESDB_DRIVER");
}

function getPostgresDBUser(): string {
  return getEnvVar("POSTGRESDB_USER");
}

function getPostgresDBPassword(): string {
  return getEnvVar("POSTGRESDB_PASSWORD");
}

function getPostgresDBHost(): string {
  return getEnvVar("POSTGRESDB_HOST");
}

function getPostgresDBPort(): string {
  return getEnvVar("POSTGRESDB_PORT");
}

function getPostgresDBName(): string {
  return getEnvVar("POSTGRESDB_NAME");
}

export {
  getPostgresDBDriver,
  getPostgresDBHost,
  getPostgresDBName,
  getPostgresDBPassword,
  getPostgresDBPort,
  getPostgresDBUser,
};
