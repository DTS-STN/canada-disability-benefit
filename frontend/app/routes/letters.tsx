import type { ChangeEvent } from 'react';

import type { RouteHandle } from 'react-router';
import { useSearchParams } from 'react-router';

import { Trans, useTranslation } from 'react-i18next';
import * as v from 'valibot';

import type { Route } from './+types/letters';

import { getLetterService } from '~/.server/domain/services/letter.service';
import { LogFactory } from '~/.server/logging';
import { requireAuth } from '~/.server/utils/auth-utils';
import { ButtonLink } from '~/components/button-link';
import { InputSelect } from '~/components/input-select';
import { InlineLink } from '~/components/links';
import { PageTitle } from '~/components/page-title';
import { AppError } from '~/errors/app-error';
import { ErrorCodes } from '~/errors/error-codes';
import { useLanguage } from '~/hooks/use-language';
import { getTranslation } from '~/i18n-config.server';
import { handle as parentHandle } from '~/routes/layout';

export const handle = {
  i18nNamespace: [...parentHandle.i18nNamespace],
} as const satisfies RouteHandle;

const orderEnumSchema = v.picklist(['asc', 'desc']);

const log = LogFactory.getLogger(import.meta.url);

export async function loader({ context, params, request }: Route.LoaderArgs) {
  const { userinfoTokenClaims } = await requireAuth(context.session, request);
  const { t } = await getTranslation(request, handle.i18nNamespace);

  const { MSCA_BASE_URL } = globalThis.__appEnvironment;

  const sortParam = new URL(request.url).searchParams.get('sort');
  const sortOrder = v.parse(v.fallback(orderEnumSchema, 'desc'), sortParam);

  if (!userinfoTokenClaims.sin) {
    log.warn('Error: User Info Token sin not defined');
    throw new AppError('No SIN found in userinfo token', ErrorCodes.MISSING_SIN);
  }
  const name = userinfoTokenClaims.sin;
  const user = userinfoTokenClaims.sub;
  const { session } = context;
  const letters = await getLetterService().findLettersBySin({ sin: name, userId: user, sortOrder });
  session.letterState = letters;

  return { documentTitle: t('app:letters.page-title'), letters, sortOrder, MSCA_BASE_URL };
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data?.documentTitle }];
}

export default function LettersIndex({ loaderData, params }: Route.ComponentProps) {
  const { currentLanguage } = useLanguage();
  const [, setSearchParams] = useSearchParams();
  const { t } = useTranslation(handle.i18nNamespace);

  const { letters, sortOrder, MSCA_BASE_URL } = loaderData;

  function handleOnSortOrderChange(e: ChangeEvent<HTMLSelectElement>) {
    setSearchParams((prev) => {
      prev.set('sort', e.target.value);
      return prev;
    });
  }

  const canadadisabilitybenefit = (
    <InlineLink
      to={t('app:letters.canada-disability-benefit.href')}
      className="external-link"
      newTabIndicator
      target="_blank"
    />
  );
  const canadadisabilitybenefitcontact = (
    <InlineLink
      to={t('app:letters.canada-disability-benefit-contact.href')}
      className="external-link"
      newTabIndicator
      target="_blank"
    />
  );

  return (
    <>
      <div className="mb-8">
        <PageTitle className="after:w-14">{t('app:letters.page-title')}</PageTitle>
      </div>
      {letters.length === 0 ? (
        <>
          <div className="space-y-4">
            <p className="font-bold">{t('app:letters.no-letter')}</p>
            <p>
              <Trans
                ns={handle.i18nNamespace}
                i18nKey="app:letters.service-eligible"
                components={{ canadadisabilitybenefit }}
              />
            </p>
            <p>
              <Trans
                ns={handle.i18nNamespace}
                i18nKey="app:letters.application-status"
                components={{ canadadisabilitybenefitcontact }}
              />
            </p>
          </div>
        </>
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

          <ul className="divide-y border-y">
            {letters.map((letter) => {
              const parts = letter.letterTypeId.split(/\s*(-|\u2013|\u2014)\s*/);

              const frenchLetterName = parts[0] ? parts[0].trim() : '';
              const englishLetterName = parts[2] ? parts[2].trim() : letter.letterTypeId;
              const letterName = currentLanguage === 'en' ? englishLetterName : frenchLetterName;
              const gcAnalyticsCustomClickValue = `ESDC-EDSC:CDB Letters Click:${letterName}`;
              const date = new Date(letter.date);
              const dateLanguage = currentLanguage + '-CA';
              const formattedDate = date.toLocaleString(dateLanguage, {
                dateStyle: 'long',
              });

              return (
                <li key={letter.id} className="px-4 py-4 sm:py-6">
                  <InlineLink
                    reloadDocument
                    file="routes/$id.download.ts"
                    params={{ ...params, id: letter.id }}
                    className="external-link"
                    newTabIndicator
                    target="_blank"
                    data-gc-analytics-customclick={gcAnalyticsCustomClickValue}
                  >
                    {letterName} {t('app:letters.file-type')}
                  </InlineLink>
                  <p className="mt-1 text-sm text-gray-500">{t('app:letters.date', { date: formattedDate })}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <div className="my-6 flex flex-wrap items-center gap-3">
        <ButtonLink
          id="back-button"
          to={t('gcweb:app.menu-dashboard.href', { baseUri: MSCA_BASE_URL })}
          variant="alternative"
          className="border-2 border-slate-600"
        >
          {t('app:letters.button.back')}
        </ButtonLink>
      </div>
    </>
  );
}
