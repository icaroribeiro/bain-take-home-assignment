class ApplicationSettings {
  public getPort(): string {
    return this.getEnvVar("PORT");
  }

  public getNominatimAPIURL(): string {
    return this.getEnvVar("NOMINATIM_API_URL");
  }

  private getEnvVar(name: string): string {
    if (!process.env[name]) {
      console.warn(`${name} isn't set`);
      return "";
    }
    return process.env[name];
  }
}

export { ApplicationSettings };
