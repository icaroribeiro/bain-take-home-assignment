import { getEnvVar } from "../utils";

function getPort(): string {
  return getEnvVar("PORT");
}

export { getPort };
