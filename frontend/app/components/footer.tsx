import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

import { AppLink } from './links';

export interface FooterProps {
  bilingual: boolean;
}

export function Footer({ bilingual }: FooterProps) {
  const { i18n, t } = useTranslation(['gcweb']);
  const en = i18n.getFixedT('en');
  const fr = i18n.getFixedT('fr');
  const { MSCA_BASE_URL, ECAS_BASE_URL } = globalThis.__appEnvironment;

  return (
    <footer id="wb-info" tabIndex={-1} className="mt-8 bg-stone-50 print:hidden">
      <div>
        {!bilingual && (
          <div className="bg-blue-primary">
            <section className="container py-4">
              <h2 className="mb-4 text-[26px] text-white md:text-[29px] md:leading-[1.23]">
                {t('gcweb:footer.service-canada')}
              </h2>
              <div className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
                <AppLink
                  to={t('gcweb:app.contact-us.href', { baseUri: MSCA_BASE_URL })}
                  property="item"
                  typeof="WebPage"
                  className="text-white hover:underline"
                >
                  <span property="name" className="text-white">
                    {t('gcweb:app.contact-us')}
                  </span>
                </AppLink>
              </div>
            </section>
          </div>
        )}
      </div>
      <div className="container flex justify-between">
        {bilingual ? (
          <h2 className="sr-only md:text-[39px] md:leading-[1.23]">
            <span lang="en">{en('gcweb:footer.about-site')}</span> / <span lang="fr">{fr('gcweb:footer.about-site')}</span>
          </h2>
        ) : (
          <h2 className="sr-only md:text-[39px] md:leading-[1.23]">{t('gcweb:footer.about-site')}</h2>
        )}
        <div className="md:flow-row flex items-center">
          <ul className="flex list-none flex-col pt-4 text-sm whitespace-nowrap md:flex-row">
            <li className="mb-4.25 list-inside list-none pr-4">
              <AppLink
                className="text-deep-blue-dark hover:underline"
                to={t('gcweb:footer.terms-conditions.href', { baseUri: ECAS_BASE_URL })}
                data-gc-analytics-navigation={`Footer:Footer:${t('gcweb:footer.terms-conditions.text')}`}
              >
                {t('gcweb:footer.terms-conditions.text')}
              </AppLink>
            </li>
            <li className="mb-4.25 list-inside list-none pr-4 md:list-disc">
              <AppLink
                className="text-deep-blue-dark hover:underline"
                to={t('gcweb:footer.privacy.href', { baseUri: ECAS_BASE_URL })}
                data-gc-analytics-navigation={`Footer:Footer:${t('gcweb:footer.privacy.text')}`}
              >
                {t('gcweb:footer.privacy.text')}
              </AppLink>
            </li>
            <li className="float-left cursor-pointer sm:hidden">
              <a id="top_btn" href="#top" className="inline-flex items-center">
                {t('gcweb:footer.top-of-page')}
                <FontAwesomeIcon icon={faChevronUp} className="pl-2 sm:hidden" />
              </a>
            </li>
          </ul>
        </div>
        <div className="mr-1.25 flex min-h-24 shrink-0 items-end md:items-center">
          <img
            src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg"
            alt={bilingual ? `${en('gcweb:footer.gc-symbol')} / ${fr('gcweb:footer.gc-symbol')}` : t('gcweb:footer.gc-symbol')}
            width={300}
            height={71}
            className="my-3.75 h-6.25 w-26.25 md:h-10 md:w-41"
          />
        </div>
      </div>
    </footer>
  );
}
