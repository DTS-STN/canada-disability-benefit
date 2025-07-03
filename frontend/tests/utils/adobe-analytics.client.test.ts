// import { afterEach, describe, expect, it, vi } from 'vitest';

// import { pushErrorEvent, pushPageviewEvent, isConfigured } from '~/utils/adobe-analytics.client';

// /*
//  * @vitest-environment jsdom
//  */

// vi.mock('~/environment/adobe');

// // describe('isConfigured + pushPageViewEvent + pushErrorEvent', () => {
// //   afterEach(() => {
// //     vi.restoreAllMocks();
// //   });

// //   it('should return true if all necessary environment variables are present and are valid URLs', () => {
// //     vi.mocked(getClientEnv()).ADOBE_ANALYTICS_JQUERY_SRC = 'http://example.com/jquery.min.js';
// //     vi.mocked(parsedClientEnv).ADOBE_ANALYTICS_SRC = 'http://example.com/adobe-analytics.min.js';

// //     const result = isConfigured();
// //     expect(result).toBe(true);
// //   });

// //   it('should return false if ADOBE_ANALYTICS_SRC is missing', () => {
// //     vi.mocked(parsedClientEnv).ADOBE_ANALYTICS_JQUERY_SRC = 'http://example.com/jquery.min.js';
// //     vi.mocked(parsedClientEnv).ADOBE_ANALYTICS_SRC = undefined;

// //     const result = isConfigured();
// //     expect(result).toBe(false);
// //   });

//   describe('pushErrorEvent', () => {
//     const originalAdobeDataLayer = window.adobeDataLayer;

//     afterEach(() => {
//       window.adobeDataLayer = originalAdobeDataLayer;
//       vi.restoreAllMocks();
//     });

//     it('does not send an event if window.adobeDataLayer is not defined', () => {
//       const spyConsoleWarnSpy = vi.spyOn(console, 'warn').mockImplementationOnce(() => {});

//       pushErrorEvent(404);

//       expect(spyConsoleWarnSpy).toHaveBeenCalledWith(
//         'window.adobeDataLayer is not defined. This could mean your adobe analytics script has not loaded on the page yet.',
//       );
//     });

//     it('sends a pushErrorEvent event with the correct pushErrorEvent status code', () => {
//       window.adobeDataLayer = { push: vi.fn() };

//       pushErrorEvent(404);

//       expect(window.adobeDataLayer.push).toHaveBeenCalledWith({
//         event: 'error',
//         error: { name: '404' },
//       });
//     });
//   });

//   describe('pushPageviewEvent', () => {
//     const originalAdobeDataLayer = window.adobeDataLayer;

//     afterEach(() => {
//       window.adobeDataLayer = originalAdobeDataLayer;
//       vi.restoreAllMocks();
//     });

//     it('does not send an event if window.adobeDataLayer is not defined', () => {
//       const spyConsoleWarnSpy = vi.spyOn(console, 'warn').mockImplementationOnce(() => {});

//       pushPageviewEvent('https://www.example.com');

//       expect(spyConsoleWarnSpy).toHaveBeenCalledWith(
//         'window.adobeDataLayer is not defined. This could mean your adobe analytics script has not loaded on the page yet.',
//       );
//     });

//     it('sends a pageLoad event with the correct URL', () => {
//       window.adobeDataLayer = { push: vi.fn() };

//       pushPageviewEvent('https://www.example.com/about-us');

//       expect(window.adobeDataLayer.push).toHaveBeenCalledWith({
//         event: 'pageLoad',
//         page: { url: 'www.example.com/about-us' },
//       });
//     });
//   });
// });
