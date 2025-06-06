import type { RouteHandle } from 'react-router';
import { Outlet, useNavigate } from 'react-router';

import { useTranslation } from 'react-i18next';

import type { Route } from './+types/layout';

import { requireAuth } from '~/.server/utils/auth-utils';
import { AppBar } from '~/components/app-bar';
import { LanguageSwitcher } from '~/components/language-switcher';
import { AppLink } from '~/components/links';
import { PageDetails } from '~/components/page-details';
import { SessionTimeout } from '~/components/session-timeout';
import { SkipNavigationLinks } from '~/components/skip-navigation-links';
import { useLanguage } from '~/hooks/use-language';
import { useRoute } from '~/hooks/use-route';

export const handle = {
  i18nNamespace: ['app', 'gcweb'],
} as const satisfies RouteHandle;

export async function loader({ context, request }: Route.LoaderArgs) {
  const { userinfoTokenClaims } = await requireAuth(context.session, request);
  return { name: userinfoTokenClaims.sin };
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(handle.i18nNamespace);
  const { id: pageId } = useRoute();
  const navigate = useNavigate();

  const {
    BUILD_DATE, //
    BUILD_VERSION,
    SESSION_TIMEOUT_PROMPT_SECONDS,
    SESSION_TIMEOUT_SECONDS,
  } = globalThis.__appEnvironment;

  return (
    <>
      <SessionTimeout
        promptBeforeIdle={SESSION_TIMEOUT_PROMPT_SECONDS * 1000}
        timeout={SESSION_TIMEOUT_SECONDS * 1000}
        onSessionEnd={() => navigate(`/auth/logout?lang=${currentLanguage}`)}
        onSessionExtend={() => void fetch('/auth/session-refresh', { method: 'POST' })}
      />
      <header className="print:hidden">
        <SkipNavigationLinks />
        <div id="wb-bnr">
          <div className="container flex items-center justify-between gap-6 py-2.5 sm:py-3.5">
            <AppLink to="https://canada.ca/">
              <img
                className="h-8 w-auto"
                src={`https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-${currentLanguage}.svg`}
                alt={t('gcweb:header.govt-of-canada.text')}
                width="300"
                height="28"
                decoding="async"
              />
            </AppLink>
            <LanguageSwitcher>{t('gcweb:language-switcher.alt-lang')}</LanguageSwitcher>
          </div>
        </div>
        <AppBar name={loaderData.name} />
      </header>
      <main className="container print:w-full print:max-w-none">
        <Outlet />
        <PageDetails buildDate={BUILD_DATE} buildVersion={BUILD_VERSION} pageId={pageId} />
      </main>
      <footer id="wb-info" tabIndex={-1} className="bg-stone-50 print:hidden">
        <div className="container flex items-center justify-end gap-6 py-2.5 sm:py-3.5">
          <div>
            <h2 className="sr-only">{t('gcweb:footer.about-site')}</h2>
            <div>
              <img
                src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg"
                alt={t('gcweb:footer.gc-symbol')}
                width={300}
                height={71}
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
