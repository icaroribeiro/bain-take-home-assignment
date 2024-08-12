import { NextFunction, Request, Response } from "express";
import { OK } from "http-status";

import { CalculateAddrDistanceInput } from "../schemas";
import { calculateAddrsDistance } from "../services";
import { createAddrsDistanceHistory } from "../services/address.service";

const calculateAddrsDistSchemaHandler = async (
  req: Request<{}, {}, CalculateAddrDistanceInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { srcAddress, dstAddress } = req.body;
    const distance = await calculateAddrsDistance(srcAddress, dstAddress);
    await createAddrsDistanceHistory(srcAddress, dstAddress, distance);
    console.log("Succeeded to calculate the distance between addresses!");
    res.status(OK).json({
      status: "success",
      value: distance,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { calculateAddrsDistSchemaHandler };
