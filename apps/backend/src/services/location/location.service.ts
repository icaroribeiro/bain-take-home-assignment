import { GeolibInputCoordinates } from "geolib/es/types";
import { INTERNAL_SERVER_ERROR, OK } from "http-status";
import { injectable } from "tsyringe";

import { Address } from "../../api/models";
import { AppError } from "../../app-error";
import { getNominatimAPIURL } from "../../config";
import { GeoJson } from "./geo-json.model";

@injectable()
class LocationService {
  constructor() {}

  public async getAddressGeoCoordinates(
    address: Address,
  ): Promise<GeolibInputCoordinates> {
    const baseUrl = getNominatimAPIURL();
    const urlQuery = this.createSearchURLQuery(address);
    const url = `${baseUrl}/search?${urlQuery}&format=geojson`;

    let res: Response;
    try {
      res = await fetch(url, {
        method: "GET",
        headers: { "content-Type": "application/json" },
      });
    } catch (error) {
      const message =
        "An error occurred when calling Nominatim API to get the address geo coordinates";
      if (error instanceof Error) {
        console.error(message, error.message);
      }
      throw new AppError(INTERNAL_SERVER_ERROR, message);
    }

    const body = await res.text();
    if (res.status !== OK) {
      const message = `Nominatim API unexpectedly returned=${body}`;
      console.error(message);
      throw new AppError(INTERNAL_SERVER_ERROR, message);
    }

    let jsonBody: GeoJson;
    try {
      jsonBody = JSON.parse(body);
    } catch (error) {
      const message =
        "An error occurred when parsing the response body string into object";
      if (error instanceof Error) {
        console.error(message, error.message);
      }
      throw new AppError(INTERNAL_SERVER_ERROR, message);
    }

    return this.parseGeoCoordinates(jsonBody);
  }

  public createSearchURLQuery(address: Address): string {
    let params: URLSearchParams;
    try {
      params = new URLSearchParams(address);
      return params.toString();
    } catch (error) {
      const message = "An error occurred when creating the search URL query";
      if (error instanceof Error) {
        console.error(message, error.message);
      }
      throw new AppError(INTERNAL_SERVER_ERROR, message);
    }
  }

  public parseGeoCoordinates(jsonBody: GeoJson): GeolibInputCoordinates {
    let geoCoordinates: GeolibInputCoordinates;
    try {
      const geoJsonBody: GeoJson = jsonBody;
      const latitude = geoJsonBody.features[0].geometry.coordinates[0];
      const longitude = geoJsonBody.features[0].geometry.coordinates[1];
      geoCoordinates = {
        latitude: latitude,
        longitude: longitude,
      };
    } catch (error) {
      const message =
        "An error occurred when parsing the geo coordinates from JSON response body";
      if (error instanceof Error) {
        console.error(message, error.message);
      }
      throw new AppError(INTERNAL_SERVER_ERROR, message);
    }

    return geoCoordinates;
  }
}

export { LocationService };
