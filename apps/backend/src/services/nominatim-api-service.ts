import { GeolibInputCoordinates } from "geolib/es/types";
import { INTERNAL_SERVER_ERROR, OK } from "http-status";

import { getNominatimAPIURL } from "../config";
import { Address, SearchGeoJsonSchema } from "../schemas";
import { AppError } from "../utils";

async function getAddrGeoCoordinates(
  address: Address,
): Promise<GeolibInputCoordinates> {
  const baseUrl = getNominatimAPIURL();
  const urlQuery = createSearchURLQuery(address);
  const url = `${baseUrl}/search?${urlQuery}&format=geojson`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: { "content-Type": "application/json" },
    });
  } catch (error) {
    const message =
      "An internal server error occurred when calling Nominatim API to get address geo coordinates";
    console.error(message, error);
    throw new AppError(INTERNAL_SERVER_ERROR, message);
  }

  const body = await res.text();
  if (res.status !== OK) {
    const message = `Nominatim API unexpectedly returned=${body}`;
    console.error(message);
    throw new AppError(INTERNAL_SERVER_ERROR, message);
  }

  let jsonBody: any;
  try {
    jsonBody = JSON.parse(body);
  } catch (error) {
    const message =
      "An internal server error occurred when parsing response body string into object";
    console.error(message, error);
    throw new AppError(INTERNAL_SERVER_ERROR, message);
  }

  return parseGeoCoordinates(jsonBody);
}

function createSearchURLQuery(address: Address): string {
  let params: unknown;
  try {
    params = new URLSearchParams(address);
  } catch (error) {
    const message =
      "An internal server error occurred when creating search URL query";
    console.error(message, error);
    throw new AppError(INTERNAL_SERVER_ERROR, message);
  }
  return params.toString();
}

async function parseGeoCoordinates(
  jsonBody: any,
): Promise<GeolibInputCoordinates> {
  let geoCoordinates: GeolibInputCoordinates;
  try {
    const searchGeoJsonBody = SearchGeoJsonSchema.parse(jsonBody);
    const latitude = searchGeoJsonBody.features[0].geometry.coordinates[0];
    const longitude = searchGeoJsonBody.features[0].geometry.coordinates[1];
    geoCoordinates = {
      latitude: latitude,
      longitude: longitude,
    };
  } catch (error) {
    const message =
      "An internal server error occurred when parsing geo coordinates from JSON response body";
    console.error(message, error);
    throw new AppError(INTERNAL_SERVER_ERROR, message);
  }

  return geoCoordinates;
}

export { getAddrGeoCoordinates };
