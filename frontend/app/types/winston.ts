import type winston from 'winston';

import type { LogLevel } from '~/.server/environment/logging';

declare module 'winston' {
  interface Logger extends Record<LogLevel, winston.LeveledLogMethod> {}
}

export {};
