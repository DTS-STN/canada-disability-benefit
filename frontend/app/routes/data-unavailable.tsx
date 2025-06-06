import type { RouteHandle } from 'react-router';

import { useTranslation } from 'react-i18next';

import type { Route } from './+types/index';

import { requireAuth } from '~/.server/utils/auth-utils';
import { PageTitle } from '~/components/page-title';
import { getTranslation } from '~/i18n-config.server';
import { handle as parentHandle } from '~/routes/layout';

export const handle = {
  i18nNamespace: [...parentHandle.i18nNamespace],
} as const satisfies RouteHandle;

export async function loader({ context, params, request }: Route.LoaderArgs) {
  await requireAuth(context.session, request);
  const { t } = await getTranslation(request, handle.i18nNamespace);
  return { documentTitle: t('app:index.page-title') };
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data?.documentTitle }];
}

export default function Index() {
  const { t } = useTranslation(handle.i18nNamespace);

  return (
    <div className="mb-8">
      <PageTitle className="after:w-14">{t('app:index.page-title')}</PageTitle>
      <h2 className="mt-10 mb-2 text-2xl font-bold text-slate-700">{t('app:index.about')}</h2>
    </div>
  );
}
