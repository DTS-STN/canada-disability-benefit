import * as v from 'valibot';

import type { LogLevel } from '~/.server/logging';
import { logLevels } from '~/.server/logging';
import { stringToBooleanSchema } from '~/.server/validation/string-to-boolean-schema';

export type Logging = Readonly<v.InferOutput<typeof logging>>;

const isProduction = process.env.NODE_ENV === 'production';

export const defaults = {
  LOG_LEVEL: isProduction ? 'info' : 'debug',
  LOG_AUDITING_ENABLED: isProduction ? 'true' : 'false',
} as const;

export const logging = v.object({
  LOG_LEVEL: v.optional(v.picklist(Object.keys(logLevels) as LogLevel[]), defaults.LOG_LEVEL),
  LOG_AUDITING_ENABLED: v.optional(stringToBooleanSchema(), defaults.LOG_AUDITING_ENABLED),
});
