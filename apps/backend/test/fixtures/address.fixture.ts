import { createFixture } from "zod-fixture";

import { addressSchema } from "../../src/api/models";

const addressFixture = createFixture(addressSchema);

export { addressFixture };
