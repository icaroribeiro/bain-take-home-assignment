import { z } from "zod";

import { PaginatedResult } from "../../../services/pagination";
import { addressSchema } from "../../models";

type Address = ReturnType<typeof addressSchema.parse>;

type CalcDistanceBetweenAddressesRequest = {
  srcAddress: Address;
  dstAddress: Address;
};

const calcDistanceBetweenAddressesRequestSchema = z.object({
  body: z.object({
    srcAddress: addressSchema,
    dstAddress: addressSchema,
  }),
});

type CalcDistanceBetweenAddressesResponse = {
  status: string;
  result: {
    distance: number;
  };
};

type GetDistacesBetweenAddressesHistoryResponse<PaginatedEntity> = {
  status: string;
  result: PaginatedResult<PaginatedEntity>;
};

export {
  CalcDistanceBetweenAddressesRequest,
  calcDistanceBetweenAddressesRequestSchema,
  CalcDistanceBetweenAddressesResponse,
  GetDistacesBetweenAddressesHistoryResponse,
};
