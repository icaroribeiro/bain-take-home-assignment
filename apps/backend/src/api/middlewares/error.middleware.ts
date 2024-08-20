import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } from "http-status";
import { ValidateError } from "tsoa";

import { AppError } from "../../app-error";
import { ErrorResponse, FailResponse } from "../models";

function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    error.status = error.status || "error";
    error.statusCode = error.statusCode || INTERNAL_SERVER_ERROR;
    const response: ErrorResponse = {
      status: error.status,
      message: error.message,
    };
    res.status(error.statusCode).json(response);
  } else if (error instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, error.fields);
    const response: FailResponse = {
      status: "fail",
      message: "Validation Failed",
      details: error?.fields,
    };
    res.status(UNPROCESSABLE_ENTITY).json(response);
  } else if (error instanceof Error) {
    const response: ErrorResponse = {
      status: "error",
      message: error.message,
    };
    res.status(INTERNAL_SERVER_ERROR).json(response);
  }
}

export { errorMiddleware };
