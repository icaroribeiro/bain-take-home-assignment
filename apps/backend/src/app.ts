import express, {
  Application,
  json,
  NextFunction,
  Request,
  Response,
} from "express";
import { BAD_REQUEST } from "http-status";

import { errorMiddleware } from "./middlewares";
import { addressRouter } from "./routers/address-router";
import { AppError } from "./utils";

const app: Application = express();
app.use(json());
app.use("/api/addresses", addressRouter);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(BAD_REQUEST, `Route ${req.originalUrl} not found`));
});
app.use(errorMiddleware);

export { app };
