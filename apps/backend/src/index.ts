import "reflect-metadata";

import { Application } from "express";
import { createServer, Server as HttpServer } from "http";
import { container } from "tsyringe";
import { DataSource } from "typeorm";

import { Server } from "./api/server";
import { getPort } from "./config/server";
import { PostgresDataSource } from "./data-sources";
import { connToDataSource } from "./ds-conn";

const start = async (): Promise<void> => {
  try {
    let globalDataSource: DataSource | undefined = undefined;
    if (!globalDataSource) {
      globalDataSource = await connToDataSource(PostgresDataSource);
      container.register("DataSource", { useValue: globalDataSource });
    }

    const app: Application = new Server().app;
    const server: HttpServer = createServer(app);

    const port = parseInt(getPort());
    server.listen(port, () => {
      console.log("Server has been started successfully!");
    });

    server.on("close", () => {
      console.log("Server closed successfully!");
    });
  } catch (err) {
    const message = "An error occurred when starting the server";
    console.error(message, err);
  }
};

await start();
