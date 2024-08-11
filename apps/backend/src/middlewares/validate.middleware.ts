import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "http-status";
import { AnyZodObject, ZodError, ZodOptional } from "zod";

import { AppError } from "../utils";

const middleware = (schema: AnyZodObject | ZodOptional<AnyZodObject>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        console.error(messages.join(","));
        throw new AppError(BAD_REQUEST, messages.join(","));
      } else {
        const message =
          "An internal server error occurred when validating user inputs";
        console.error(message);
        throw new AppError(INTERNAL_SERVER_ERROR, message);
      }
    }
  };
};

export { middleware as validateMiddleware };
