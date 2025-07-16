import { afterEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

import { isConfigured, pushErrorEvent, pushPageviewEvent } from '~/utils/adobe-analytics.client';

/*
 * @vitest-environment jsdom
 */

describe('adobe-analytics', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return true if all necessary environment variables are present and are valid URLs', () => {
    globalThis.__appEnvironment = mock({
      isProduction: false,
      ADOBE_ANALYTICS_SRC: 'http://example.com/adobe-analytics.min.js',
      ADOBE_ANALYTICS_JQUERY_SRC: 'http://example.com/jquery.min.js',
      BASE_TIMEZONE: 'Canada/Eastern',
      BUILD_DATE: '1970-01-01T00:00:00.000Z',
      BUILD_ID: '000000',
      BUILD_REVISION: '00000000',
      BUILD_VERSION: '0.0.0-000000-00000000',
      I18NEXT_DEBUG: false,
      SESSION_TIMEOUT_PROMPT_SECONDS: 5 * 60,
      SESSION_TIMEOUT_SECONDS: 19 * 60,
      MSCA_BASE_URL: 'http://localhost:3000',
      ECAS_BASE_URL: 'http://localhost:3000',
    });

    const result = isConfigured();
    expect(result).toBe(true);
  });

  it('should return false if ADOBE_ANALYTICS_SRC is missing', () => {
    globalThis.__appEnvironment = mock({
      isProduction: false,
      ADOBE_ANALYTICS_SRC: undefined,
      ADOBE_ANALYTICS_JQUERY_SRC: 'http://example.com/jquery.min.js',
      BASE_TIMEZONE: 'Canada/Eastern',
      BUILD_DATE: '1970-01-01T00:00:00.000Z',
      BUILD_ID: '000000',
      BUILD_REVISION: '00000000',
      BUILD_VERSION: '0.0.0-000000-00000000',
      I18NEXT_DEBUG: false,
      SESSION_TIMEOUT_PROMPT_SECONDS: 5 * 60,
      SESSION_TIMEOUT_SECONDS: 19 * 60,
      MSCA_BASE_URL: 'http://localhost:3000',
      ECAS_BASE_URL: 'http://localhost:3000',
    });

    const result = isConfigured();
    expect(result).toBe(false);
  });

  describe('pushErrorEvent', () => {
    const originalAdobeDataLayer = window.adobeDataLayer;

    afterEach(() => {
      window.adobeDataLayer = originalAdobeDataLayer;
      vi.restoreAllMocks();
    });

    it('does not send an event if window.adobeDataLayer is not defined', () => {
      const spyConsoleWarnSpy = vi.spyOn(console, 'warn').mockImplementationOnce(() => {});

      pushErrorEvent(404);

      expect(spyConsoleWarnSpy).toHaveBeenCalledWith(
        'window.adobeDataLayer is not defined. This could mean your adobe analytics script has not loaded on the page yet.',
      );
    });

    it('sends a pushErrorEvent event with the correct pushErrorEvent status code', () => {
      window.adobeDataLayer = { push: vi.fn() };

      pushErrorEvent(404);

      expect(window.adobeDataLayer.push).toHaveBeenCalledWith({
        event: 'error',
        error: { name: '404' },
      });
    });
  });

  describe('pushPageviewEvent', () => {
    const originalAdobeDataLayer = window.adobeDataLayer;

    afterEach(() => {
      window.adobeDataLayer = originalAdobeDataLayer;
      vi.restoreAllMocks();
    });

    it('does not send an event if window.adobeDataLayer is not defined', () => {
      const spyConsoleWarnSpy = vi.spyOn(console, 'warn').mockImplementationOnce(() => {});

      pushPageviewEvent('https://www.example.com');

      expect(spyConsoleWarnSpy).toHaveBeenCalledWith(
        'window.adobeDataLayer is not defined. This could mean your adobe analytics script has not loaded on the page yet.',
      );
    });

    it('sends a pageLoad event with the correct URL', () => {
      window.adobeDataLayer = { push: vi.fn() };

      pushPageviewEvent('https://www.example.com/about-us');

      expect(window.adobeDataLayer.push).toHaveBeenCalledWith({
        event: 'pageLoad',
        page: { url: 'www.example.com/about-us' },
      });
    });
  });
});
