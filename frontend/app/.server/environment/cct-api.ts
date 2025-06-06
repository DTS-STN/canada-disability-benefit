import * as v from 'valibot';

export type CctApi = Readonly<v.InferOutput<typeof cctApi>>;

export const defaults = {
  CCT_API_BASE_URI: 'http://localhost:8080/api/v1/',
  CCT_API_MAX_RETRIES: 3,
  CCT_API_BACKOFF_MS: 100,
  CCT_API_SUBSCRIPTION_KEY: '',
  CCT_API_COMMUNITY: 'CDB',
  HTTP_PROXY_URL: '',
  HTTP_PROXY_TLS_TIMEOUT: 30 * 1000,
  HEALTH_PLACEHOLDER_REQUEST_VALUE: 'CDB_HEALTH_CHECK',
} as const;

export const cctApi = v.object({
  CCT_API_BASE_URI: v.optional(v.string(), defaults.CCT_API_BASE_URI),
  CCT_API_MAX_RETRIES: v.optional(v.number(), defaults.CCT_API_MAX_RETRIES),
  CCT_API_BACKOFF_MS: v.optional(v.number(), defaults.CCT_API_BACKOFF_MS),
  CCT_API_SUBSCRIPTION_KEY: v.optional(v.string(), defaults.CCT_API_SUBSCRIPTION_KEY),
  CCT_API_COMMUNITY: v.optional(v.string(), defaults.CCT_API_COMMUNITY),
  HTTP_PROXY_URL: v.optional(v.string(), defaults.HTTP_PROXY_URL),
  HTTP_PROXY_TLS_TIMEOUT: v.optional(v.number(), defaults.HTTP_PROXY_TLS_TIMEOUT),
  HEALTH_PLACEHOLDER_REQUEST_VALUE: v.optional(v.string(), defaults.HEALTH_PLACEHOLDER_REQUEST_VALUE),
});
