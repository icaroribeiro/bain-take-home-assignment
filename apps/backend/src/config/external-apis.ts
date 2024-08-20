import { getEnvVar } from "../utils";

function getNominatimAPIURL(): string {
  return getEnvVar("NOMINATIM_API_URL");
}
export { getNominatimAPIURL };
