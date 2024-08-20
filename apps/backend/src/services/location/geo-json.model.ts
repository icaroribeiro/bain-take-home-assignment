import { z } from "zod";

const GeoJsonSchema = z.object({
  features: z.array(
    z.object({
      geometry: z.object({
        type: z.string(),
        coordinates: z.array(z.number()),
      }),
    }),
  ),
});

type GeoJson = z.infer<typeof GeoJsonSchema>;

export { GeoJson };
