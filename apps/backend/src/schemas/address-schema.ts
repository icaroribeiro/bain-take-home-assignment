import { object, string, TypeOf } from "zod";

import { optional } from "../utils/schema-util";

const AddressSchema = object({
  amenity: optional(string().optional()),
  street: optional(string().optional()),
  city: optional(string().optional()),
  county: optional(string().optional()),
  state: optional(string().optional()),
  country: optional(string().optional()),
  postalcode: optional(string().optional()),
});

const calculateAddrsDistSchema = object({
  srcAddress: AddressSchema.required(),
  dstAddress: AddressSchema.required(),
});

type Address = TypeOf<typeof AddressSchema>;
type CalculateAddrDistanceInput = TypeOf<typeof calculateAddrsDistSchema>;

export { Address, CalculateAddrDistanceInput, calculateAddrsDistSchema };
