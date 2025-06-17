import * as v from 'valibot';

import { stringToBooleanSchema } from '../validation/string-to-boolean-schema';
import { stringToIntegerSchema } from '../validation/string-to-integer-schema';

export type CctApi = Readonly<v.InferOutput<typeof cctApi>>;

export const defaults = {
  CCT_API_BASE_URI: 'http://localhost:8080/api/v1/',
  CCT_API_MAX_RETRIES: '3',
  CCT_API_BACKOFF_MS: '100',
  CCT_API_KEY: '',
  CCT_API_COMMUNITY: 'CDB',
  HTTP_PROXY_URL: '',
  HTTP_PROXY_TLS_TIMEOUT: '30000',
  HEALTH_PLACEHOLDER_REQUEST_VALUE: 'CDB_HEALTH_CHECK',
  INTEROP_API_SUBSCRIPTION_KEY: '',
  ENABLE_MOCK_LETTER_SERVICE: 'false',
} as const;

export const cctApi = v.object({
  CCT_API_BASE_URI: v.optional(v.string(), defaults.CCT_API_BASE_URI),
  CCT_API_MAX_RETRIES: v.optional(v.pipe(stringToIntegerSchema(), v.minValue(0)), defaults.CCT_API_MAX_RETRIES),
  CCT_API_BACKOFF_MS: v.optional(v.pipe(stringToIntegerSchema(), v.minValue(0)), defaults.CCT_API_BACKOFF_MS),
  CCT_API_KEY: v.optional(v.string(), defaults.CCT_API_KEY),
  CCT_API_COMMUNITY: v.optional(v.string(), defaults.CCT_API_COMMUNITY),
  HTTP_PROXY_URL: v.optional(v.string(), defaults.HTTP_PROXY_URL),
  HTTP_PROXY_TLS_TIMEOUT: v.optional(v.pipe(stringToIntegerSchema(), v.minValue(0)), defaults.HTTP_PROXY_TLS_TIMEOUT),
  HEALTH_PLACEHOLDER_REQUEST_VALUE: v.optional(v.string(), defaults.HEALTH_PLACEHOLDER_REQUEST_VALUE),
  INTEROP_API_SUBSCRIPTION_KEY: v.optional(v.string(), defaults.INTEROP_API_SUBSCRIPTION_KEY),
  ENABLE_MOCK_LETTER_SERVICE: v.optional(v.pipe(stringToBooleanSchema()), defaults.ENABLE_MOCK_LETTER_SERVICE),
});
