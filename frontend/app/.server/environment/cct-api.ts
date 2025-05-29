import * as v from 'valibot';

export type CctApi = Readonly<v.InferOutput<typeof cctApi>>;

export const defaults = {
  CCT_API_BASE_URI: 'http://localhost:8080/api/v1/',
} as const;

export const cctApi = v.object({
  CCT_API_BASE_URI: v.optional(v.string(), defaults.CCT_API_BASE_URI),
});
