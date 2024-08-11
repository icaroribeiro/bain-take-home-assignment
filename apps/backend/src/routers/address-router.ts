import express from "express";

import { calculateAddrsDistSchemaHandler } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { calculateAddrsDistSchema } from "../schemas";

const router = express.Router();

router.post(
  "/distance",
  validateMiddleware(calculateAddrsDistSchema),
  calculateAddrsDistSchemaHandler,
);

export { router as addressRouter };
