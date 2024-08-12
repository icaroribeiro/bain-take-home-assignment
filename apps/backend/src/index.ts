import { app } from "./app";
import { PostgresDataSource } from "./data-sources";
import { getPort } from "./utils";

const start = (): void => {
  PostgresDataSource.initialize()
    .then(() => {
      const port = parseInt(getPort());
      try {
        app.listen(port, () => {
          console.log("Server started successfully!");
        });
      } catch (error) {
        const message = "An error occurred when starting the server";
        console.log(message, error);
        process.exit(1);
      }
    })
    .catch((error) => {
      const message = "An error occurred when initializing the data source";
      console.log(message, error);
    });
};

start();
