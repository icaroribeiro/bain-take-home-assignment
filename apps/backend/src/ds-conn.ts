import { INTERNAL_SERVER_ERROR } from "http-status";
import { DataSource } from "typeorm";

import { AppError } from "./app-error";

async function connToDataSource(dataSource: DataSource) {
  try {
    await dataSource.initialize();
    console.log("Data Source has been initialized successfully!");
    return dataSource;
  } catch (err) {
    const message = "An error occurred when initializing the data source";
    console.error(message, err);
    throw new AppError(INTERNAL_SERVER_ERROR, message);
  }
}

export { connToDataSource };
