import { literal, union, ZodTypeAny } from "zod";

const optional = <T extends ZodTypeAny>(schema: T) => {
  return union([schema, literal("")])
    .transform((value) => (value === "" ? undefined : value))
    .optional();
};

export { optional };
