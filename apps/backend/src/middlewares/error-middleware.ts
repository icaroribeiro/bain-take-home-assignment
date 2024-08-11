import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "http-status";

import { AppError } from "../utils/app-error-util";

const middleware = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  error.status = error.status || "error";
  error.statusCode = error.statusCode || INTERNAL_SERVER_ERROR;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

export { middleware as errorMiddleware };
