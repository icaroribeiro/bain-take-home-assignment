import { getPreciseDistance } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";
import { INTERNAL_SERVER_ERROR } from "http-status";

import { Address } from "../schemas";
import { AppError } from "../utils";
import { getAddrGeoCoordinates } from "./nominatim-api.service";

const calculateAddrsDistance = async (
  srcAddress: Address,
  dstAddress: Address,
): Promise<number> => {
  let srcGeoCoordinates: GeolibInputCoordinates;
  try {
    srcGeoCoordinates = await getAddrGeoCoordinates(srcAddress);
  } catch (error) {
    const message =
      "An internal server error occurred when getting source address geo coordinates";
    console.error(message, error);
    throw new AppError(INTERNAL_SERVER_ERROR, message);
  }

  let dstGeoCoordinates: GeolibInputCoordinates;
  try {
    dstGeoCoordinates = await getAddrGeoCoordinates(dstAddress);
  } catch (error) {
    const message =
      "An internal server error occurred when getting destination address geo coordinates";
    console.error(message, error);
    throw new AppError(INTERNAL_SERVER_ERROR, message);
  }

  let distance: number;
  try {
    distance = getPreciseDistance(srcGeoCoordinates, dstGeoCoordinates);
  } catch (error) {
    const message =
      "An internal server error occurred when calculating the distance between addresses";
    console.error(message, error);
    throw new AppError(INTERNAL_SERVER_ERROR, message);
  }

  return distance;
};

export { calculateAddrsDistance };
