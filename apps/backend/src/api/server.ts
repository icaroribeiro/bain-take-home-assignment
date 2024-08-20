import express, { Application, json, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { errorMiddleware } from "./middlewares";
import { RegisterRoutes } from "./routes";

export class Server {
  private readonly _app: Application = express();

  public constructor() {
    this._app.use(json());
    this._app.use(
      "/apidocs",
      swaggerUi.serve,
      async (req: Request, res: Response) => {
        return res.send(
          swaggerUi.generateHTML(await import("../../docs/api/swagger.json")),
        );
      },
    );
    RegisterRoutes(this._app);
    this._app.use(errorMiddleware);
  }

  public get app(): express.Application {
    return this._app;
  }
}
