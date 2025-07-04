import * as v from 'valibot';

import { validUrlSchema } from '~/validation/valid-url-schema';

export const defaults = {
  ADOBE_ANALYTICS_JQUERY_SRC: 'https://code.jquery.com/jquery-3.7.1.min.js',
} as const;

export const clientEnv = v.object({
  ADOBE_ANALYTICS_SRC: v.optional(validUrlSchema()),
  ADOBE_ANALYTICS_JQUERY_SRC: v.optional(validUrlSchema(), defaults.ADOBE_ANALYTICS_JQUERY_SRC),
});

export type ClientEnv = Readonly<v.InferOutput<typeof clientEnv>>;

export function getClientEnv(): ClientEnv {
  const isServer = typeof document === 'undefined';
  let result;
  if (!isServer) {
    result = v.safeParse(clientEnv, window.env);
  } else {
    result = v.safeParse(clientEnv, process.env);
  }
  if (!result.success) {
    throw new Error(`Invalid application configuration: ${result.issues}`);
  }
  return result.output;
}
