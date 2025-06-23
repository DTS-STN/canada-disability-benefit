import * as v from 'valibot';

import { validUrlSchema } from '~/validation/valid-url-schema';

export type Adobe = Readonly<v.InferOutput<typeof adobe>>;

export const defaults = {
  ADOBE_ANALYTICS_JQUERY_SRC: 'https://code.jquery.com/jquery-3.7.1.min.js',
} as const;

export const adobe = v.object({
  ADOBE_ANALYTICS_SRC: v.optional(validUrlSchema()),
  ADOBE_ANALYTICS_JQUERY_SRC: v.optional(validUrlSchema(), defaults.ADOBE_ANALYTICS_JQUERY_SRC),
});

function getAdobeConfig(): Adobe {
  const result = v.safeParse(adobe, process.env);
  if (!result.success) {
    throw new Error(`Invalid application configuration: ${result.issues}`);
  }
  return result.output;
}

export const parsedAdobeConfig = getAdobeConfig();
