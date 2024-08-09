import { ApplicationSettings } from "./application-settings";

type AddressParams = {
  amenity: string;
  street: string;
  city: string;
  county: string;
  state: string;
  country: string;
  postalcode: string;
};

type GeoPointCoordinates = {
  lat: number;
  long: number;
};

class NominatimAPIService {
  private baseUrl: string;

  constructor() {
    const applicationSettings = new ApplicationSettings();
    this.baseUrl = applicationSettings.getNominatimAPIURL();
  }

  public async getGeoPointCoordinates(
    addressParams: AddressParams,
  ): Promise<GeoPointCoordinates | undefined> {
    const urlQuery = this.createSearchURLQuery(addressParams);
    const url = `${this.baseUrl}/search?${urlQuery}&format=geojson`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "content-Type": "application/json" },
      });
      const coordinates = this.parseGeoPointCoordinates(response);
      console.log(coordinates);
      return coordinates;
    } catch (error) {
      console.log(error);
    }
  }

  private createSearchURLQuery(addressParams: AddressParams): string {
    console.log(addressParams);
    return "";
  }

  private parseGeoPointCoordinates(response: Response): GeoPointCoordinates {
    console.log(response);
    return { lat: 0, long: 0 };
  }
}

export { NominatimAPIService, type AddressParams };
