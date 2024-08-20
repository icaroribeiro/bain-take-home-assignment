import { z } from "zod";

import { genOptionalWithEmptyLiteral } from "../../utils";

const addressSchema = z.object({
  amenity: genOptionalWithEmptyLiteral(z.string()),
  street: genOptionalWithEmptyLiteral(z.string()),
  city: genOptionalWithEmptyLiteral(z.string()),
  county: genOptionalWithEmptyLiteral(z.string()),
  state: genOptionalWithEmptyLiteral(z.string()),
  country: genOptionalWithEmptyLiteral(z.string()),
  postalcode: genOptionalWithEmptyLiteral(z.string()),
});

type Address = z.infer<typeof addressSchema>;

export { Address, addressSchema };
