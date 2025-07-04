import { getClientEnv } from '~/utils/client-env';

type AdobeDataLayer = { push?: (object: Record<string, string | Record<string, string>>) => void };

declare global {
  interface Window {
    adobeDataLayer?: AdobeDataLayer;
  }
}

export function isConfigured() {
  const env = getClientEnv();
  return env.ADOBE_ANALYTICS_SRC !== undefined;
}

export function pushErrorEvent(errorStatusCode: 404 | 500) {
  if (!window.adobeDataLayer) {
    console.warn(
      'window.adobeDataLayer is not defined. This could mean your adobe analytics script has not loaded on the page yet.',
    );
    return;
  }

  window.adobeDataLayer.push?.({
    event: 'error',
    error: { name: `${errorStatusCode}` },
  });
}

export function pushPageviewEvent(locationUrl: string | URL) {
  if (!window.adobeDataLayer) {
    console.warn(
      'window.adobeDataLayer is not defined. This could mean your adobe analytics script has not loaded on the page yet.',
    );
    return;
  }

  const locationUrlObj = new URL(locationUrl);
  const url = `${locationUrlObj.host}${locationUrlObj.pathname}`;

  window.adobeDataLayer.push?.({
    event: 'pageLoad',
    page: { url },
  });
}
