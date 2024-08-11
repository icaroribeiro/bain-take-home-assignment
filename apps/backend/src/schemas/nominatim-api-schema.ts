import { array, number, object, string, TypeOf } from "zod";

const SearchGeoJsonSchema = object({
  features: array(
    object({
      geometry: object({
        type: string(),
        coordinates: array(number()),
      }),
    }),
  ),
});

type SearchGeoJson = TypeOf<typeof SearchGeoJsonSchema>;

export { SearchGeoJson, SearchGeoJsonSchema };
