import type { ClientEnv } from '~/utils/client-env';

declare global {
  interface Window {
    env: ClientEnv;
  }
}
