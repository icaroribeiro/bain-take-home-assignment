import { INTERNAL_SERVER_ERROR } from "http-status";

import { AppError } from ".";

const getEnvVar = (name: string): string => {
  if (!process.env[name]) {
    const message = `Environment variable ${name} isn't set`;
    throw new AppError(INTERNAL_SERVER_ERROR, message);
  }
  return process.env[name];
};

const getPort = (): string => {
  return getEnvVar("PORT");
};

const getNominatimAPIURL = (): string => {
  return getEnvVar("NOMINATIM_API_URL");
};

const getPostgresDBDriver = (): string => {
  return getEnvVar("POSTGRESDB_DRIVER");
};

const getPostgresDBUser = (): string => {
  return getEnvVar("POSTGRESDB_USER");
};

const getPostgresDBPassword = (): string => {
  return getEnvVar("POSTGRESDB_PASSWORD");
};

const getPostgresDBHost = (): string => {
  return getEnvVar("POSTGRESDB_HOST");
};

const getPostgresDBPort = (): string => {
  return getEnvVar("POSTGRESDB_PORT");
};

const getPostgresDBName = (): string => {
  return getEnvVar("POSTGRESDB_NAME");
};

export {
  getNominatimAPIURL,
  getPort,
  getPostgresDBDriver,
  getPostgresDBHost,
  getPostgresDBName,
  getPostgresDBPassword,
  getPostgresDBPort,
  getPostgresDBUser,
};
