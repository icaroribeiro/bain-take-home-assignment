import { z } from "zod";

import {
  getMaximumPageSize,
  getMinimumPageNumber,
  getMinimumPageSize,
} from "../../config";
import { genOptional } from "../../utils";

const paginationQueryStringValidator = z.object({
  query: z.object({
    pageNumber: genOptional(
      z.coerce.number().min(parseInt(getMinimumPageNumber())),
    ).default(parseInt(getMinimumPageNumber())),
    pageSize: genOptional(
      z.coerce
        .number()
        .min(parseInt(getMinimumPageSize()))
        .max(parseInt(getMaximumPageSize()))
        .default(parseInt(getMinimumPageSize())),
    ),
  }),
});

export { paginationQueryStringValidator };
