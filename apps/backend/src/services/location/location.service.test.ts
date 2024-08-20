import { describe, expect, test } from "@jest/globals";

import { addressFixture } from "../../../test/fixtures";
import { AppError } from "../../app-error";
import { LocationService } from "./location.service";

describe("TestLocationService", () => {
  describe("createSearchURLQuery", () => {
    test("succeeds and returns a string with all address field values grouped as params in a URL search query", () => {
      const address = addressFixture;
      const locationService = new LocationService();

      const expectedResult = `amenity=${address.amenity}&street=${address.street}&city=${address.city}&county=${address.county}&state=${address.state}&country=${address.country}&postalcode=${address.postalcode}`;

      const result = locationService.createSearchURLQuery(address);

      expect(result).toEqual(expectedResult);
    });

    test("fails and returns app error when an expection is thrown when converting URL search query params to string", () => {
      const address = addressFixture;
      const locationService = new LocationService();

      const spy = jest
        .spyOn(URLSearchParams.prototype, "toString")
        .mockImplementation(() => {
          throw new Error("Failed");
        });

      expect(() => locationService.createSearchURLQuery(address)).toThrow(
        AppError,
      );
    });
  });
});
