import type { ChangeEvent } from 'react';

import type { RouteHandle } from 'react-router';
import { useSearchParams } from 'react-router';

import { useTranslation } from 'react-i18next';
import * as v from 'valibot';

import type { Route } from './+types/letters';

import { requireAuth } from '~/.server/utils/auth-utils';
import { ButtonLink } from '~/components/button-link';
import { InputSelect } from '~/components/input-select';
import { InlineLink } from '~/components/links';
import { PageTitle } from '~/components/page-title';
// import { useLanguage } from '~/hooks/use-language';
import { getTranslation } from '~/i18n-config.server';
import { handle as parentHandle } from '~/routes/layout';

export const handle = {
  i18nNamespace: [...parentHandle.i18nNamespace],
} as const satisfies RouteHandle;

const orderEnumSchema = v.picklist(['asc', 'desc']);

export async function loader({ context, params, request }: Route.LoaderArgs) {
  await requireAuth(context.session, request);
  const { t } = await getTranslation(request, handle.i18nNamespace);
  // FIXME ::: sort order
  const sortParam = new URL(request.url).searchParams.get('sort');
  const fallbackOrderEnumSchema = v.fallback(orderEnumSchema, 'desc');
  const sortOrder = v.parse(fallbackOrderEnumSchema, sortParam);

  // TODO ::: fetch actual data here
  const MSCA_BASE_URL = 'http://localhost:3000';
  // const letters = '';
  const letters = [
    { id: '1', date: '2024-12-25', letterTypeId: 'ACC' },
    { id: '2', date: '2004-02-29', letterTypeId: 'DEN' },
    { id: '3', date: '2004-02-29', letterTypeId: 'DEN' },
  ];
  const letterTypes = [
    { id: 'ACC', nameEn: 'Accepted', nameFr: '(FR) Accepted' },
    { id: 'DEN', nameEn: 'Denied', nameFr: '(FR) Denied' },
  ];

  return { documentTitle: t('app:letters.page-title'), letters, letterTypes, sortOrder, MSCA_BASE_URL };
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data?.documentTitle }];
}

export default function LettersIndex({ loaderData, params }: Route.ComponentProps) {
  // const { currentLanguage } = useLanguage();
  const [, setSearchParams] = useSearchParams();
  const { t } = useTranslation(handle.i18nNamespace);

  const { letters, letterTypes, sortOrder, MSCA_BASE_URL } = loaderData;

  function handleOnSortOrderChange(e: ChangeEvent<HTMLSelectElement>) {
    setSearchParams((prev) => {
      prev.set('sort', e.target.value);
      return prev;
    });
  }

  return (
    <>
      <div className="mb-8">
        <PageTitle className="after:w-14">{t('app:letters.page-title')}</PageTitle>
      </div>
      {letters.length === 0 ? (
        <p>{t('app:letters.no-letter')}</p>
      ) : (
        <>
          <div className="my-6">
            <InputSelect
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              id="sort-order"
              value={sortOrder}
              onChange={handleOnSortOrderChange}
              label={t('app:letters.filter')}
              name="sortOrder"
              options={[
                { value: 'desc', children: t('app:letters.newest') },
                { value: 'asc', children: t('app:letters.oldest') },
              ]}
            />
          </div>

          <ul className="">
            {letters.map((letter) => {
              const letterType = letterTypes.find(({ id }) => id === letter.letterTypeId);
              const gcAnalyticsCustomClickValue = `ESDC-EDSC:CDCP Letters Click:${letterType?.nameEn ?? letter.letterTypeId}`;
              const letterName = letter.letterTypeId;

              return (
                <li key={letter.id} className="my-2 rounded px-12 py-4 outline">
                  <InlineLink
                    reloadDocument
                    // TODO ::: Set actual letter route
                    file="routes/index.tsx"
                    params={{ ...params, id: letter.id }}
                    className="external-link"
                    newTabIndicator
                    target="_blank"
                    data-gc-analytics-customclick={gcAnalyticsCustomClickValue}
                  >
                    {letterName}
                  </InlineLink>
                  <p className="mt-1 text-sm text-gray-500">{t('app:letters.date', { date: letter.date })}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <div className="my-6 flex flex-wrap items-center gap-3">
        <ButtonLink id="back-button" to={MSCA_BASE_URL}>
          {t('app:letters.button.back')}
        </ButtonLink>
      </div>
    </>
  );
}
