import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { AddressParams, NominatimAPIService } from "./nominatim-api-service";
import { ApplicationSettings } from "./application-settings";

dotenv.config();

const app: Application = express();
const applicationSettings = new ApplicationSettings();

app.post("/addresses/distance", async (_req: Request, res: Response) => {
  const nominatimAPIService = new NominatimAPIService();
  const addressParams: AddressParams = {
    amenity: "",
    street: "",
    city: "",
    county: "",
    state: "",
    country: "",
    postalcode: "",
  };
  const coordinates =
    await nominatimAPIService.getGeoPointCoordinates(addressParams);
  console.log(coordinates);
  res.send({
    message: "hello world",
  });
});

const start = (): void => {
  try {
    app.listen(applicationSettings.getPort(), () => {
      console.log(
        "server started at http://localhost:" + applicationSettings.getPort(),
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
