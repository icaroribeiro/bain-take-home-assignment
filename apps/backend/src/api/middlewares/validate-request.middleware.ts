import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "http-status";
import { AnyZodObject, ZodError, ZodOptional } from "zod";

import { ErrorResponse, FailResponse } from "../models";

function validateRequestMiddleware(
  schema: AnyZodObject | ZodOptional<AnyZodObject>,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        const message =
          "A Zod error occurred when validating user inputs - " +
          JSON.stringify(messages);
        console.error(message);
        const response: FailResponse = {
          status: "fail",
          message: message,
        };
        res.status(BAD_REQUEST).json(response);
      } else if (error instanceof Error) {
        const message =
          "An error occurred when validating user inputs - " + error.message;
        console.error(message);
        const response: ErrorResponse = {
          status: "error",
          message: error.message,
        };
        res.status(INTERNAL_SERVER_ERROR).json(response);
      }
    }
  };
}

export { validateRequestMiddleware };
