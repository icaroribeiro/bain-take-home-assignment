import { app } from "./app";
import { getPort } from "./config";

const port = getPort();

const start = (): void => {
  try {
    app.listen(port, () => {
      console.log("server started at http://localhost:" + port);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
