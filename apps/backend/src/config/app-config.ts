import { INTERNAL_SERVER_ERROR } from "http-status";

import { AppError } from "../utils";

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

export { getNominatimAPIURL, getPort };
