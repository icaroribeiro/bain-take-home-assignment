class ApplicationSettings {
  public getPort() {
    return this.getEnvVar("PORT");
  }

  public getNominatimAPIURL() {
    return this.getEnvVar("NOMINATIM_API_URL");
  }

  private getEnvVar(name: string): string | undefined {
    if (!process.env[name]) {
      console.warn(`${name} isn't set`);
      return undefined;
    }
    return process.env[name];
  }
}

export { ApplicationSettings };
