function getEnvVar(name: string): string {
  if (!process.env[name]) {
    console.error(`Environment variable ${name} isn't set`);
    return "";
  }
  return process.env[name];
}

function getPort(): string {
  return getEnvVar("PORT");
}

function getNominatimAPIURL(): string {
  return getEnvVar("NOMINATIM_API_URL");
}

export { getPort, getNominatimAPIURL };
