import type { RouteConfigEntry } from '@react-router/dev/routes';
import { index, layout, route } from '@react-router/dev/routes';

// important: we cannot use aliased imports (~/) here 🤷
import type { I18nPageRoute, I18nRoute } from './i18n-routes';
import { i18nRoutes, isI18nPageRoute } from './i18n-routes';

/**
 * Generates an array of route config entries for different languages
 * based on a given file and i18n paths.
 *
 * @param i18nPageRoute - The i18n route to generate the route config entry from.
 * @returns An array of route config entries.
 */
function i18nPageRoutes(i18nPageRoute: I18nPageRoute): RouteConfigEntry[] {
  return Object.entries(i18nPageRoute.paths).map(([language, path]) => {
    const id = `${i18nPageRoute.id}-${language.toUpperCase()}`;
    return route(path, i18nPageRoute.file, { id: id });
  });
}

/**
 * Recursive function that converts an I18nRoute[] to a RouteConfigEntry[]
 * that can be used by React Router.
 *
 * @param routes - The array of i18n route definitions.
 * @returns An array of React Router route configuration entries.
 */
export function toRouteConfigEntries(routes: I18nRoute[]): RouteConfigEntry[] {
  return routes.flatMap((route) => {
    return isI18nPageRoute(route)
      ? i18nPageRoutes(route) //
      : layout(route.file, toRouteConfigEntries(route.children));
  });
}

export default [
  // requests to the application root (/) should return a 404
  index('routes/not-found.tsx', { id: 'ROOT-NOT-FOUND' }),

  // API routes
  route('/api/readyz', 'routes/api/readyz.ts'),
  route('/api/buildinfo', 'routes/api/buildinfo.ts'),
  route('/api/client-env', 'routes/api/client-env.ts'),
  route('/api/translations', 'routes/api/translations.ts'),

  // auth routes
  route('/auth/login', 'routes/auth/login.tsx'),
  route('/auth/logout', 'routes/auth/logout.tsx'),
  route('/auth/callback', 'routes/auth/callback.tsx'),
  route('/auth/session-refresh', 'routes/auth/session-refresh.tsx'),
  route('/.well-known/jwks.json', 'routes/api/jwks.ts'),

  // i18n routes
  ...toRouteConfigEntries(i18nRoutes),

  // dev-only routes
  route('/auth/raoidc/*', 'routes/dev/raoidc.tsx'),
  route('/debug-session', 'routes/dev/debug-session.tsx'),
  route('/stub-login', 'routes/dev/stub-login.tsx'),

  // testable error routes
  route('/error', 'routes/dev/error.tsx', { id: 'ERR-0001' }),
  route('/en/error', 'routes/dev/error.tsx', { id: 'ERR-0001-EN' }),
  route('/fr/erreur', 'routes/dev/error.tsx', { id: 'ERR-0001-FR' }),

  // catch-all for anything not handled by the above routes
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfigEntry[];
