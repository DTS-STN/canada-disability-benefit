import { useState } from 'react';
import type { JSX } from 'react';

import { faChevronDown, faChevronUp, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/dropdown-menu';
import { AppLink } from '~/components/links';
import { MenuItem } from '~/components/menu';
import { useLanguage } from '~/hooks/use-language';
import { cn } from '~/utils/tailwind-utils';

type AppBarProps = {
  name?: string;
};

export function AppBar({ name }: AppBarProps): JSX.Element {
  const { t } = useTranslation(['gcweb']);
  const { MSCA_BASE_URL } = globalThis.__appEnvironment;

  return (
    <div className="sm:bg-blue-primary sm:h-15">
      <div className="align-center container mx-auto flex flex-wrap justify-between">
        <div className="bg-blue-primary align-center flex h-15 w-full sm:w-auto">
          <span id="menu-label" className="my-auto px-3 md:px-1">
            <AppLink
              to={t('gcweb:app.menu-dashboard.href', { baseUri: MSCA_BASE_URL })}
              className="font-lato my-auto px-3 text-[19px] font-bold text-white hover:underline md:px-1 md:text-2xl"
            >
              {t('gcweb:app.title')}
            </AppLink>
          </span>
        </div>
        <div className="ring-blue-hover items-left order-2 flex w-full text-right text-2xl ring-offset-2 focus:ring-2 focus:outline-none sm:order-3 sm:w-65 lg:order-3">
          {name && (
            <UserButton
              className="ring-blue-hover focus:ring-blue-hover active:ring-blue-hover ring-offset-2 focus:ring-2 active:ring-2"
              name={name}
            />
          )}
        </div>
      </div>
    </div>
  );
}

type UserButtonProps = {
  className?: string;
  name?: string;
};

function UserButton({ className, name }: UserButtonProps): JSX.Element {
  const { t } = useTranslation(['gcweb']);
  const { currentLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const { MSCA_BASE_URL, SHOW_INBOX_MENU } = globalThis.__appEnvironment;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          'bg-bright-blue-pale text-blue-primary flex h-full w-full flex-nowrap space-x-2 px-4 hover:bg-neutral-300 focus:rounded-md focus:bg-neutral-300 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-hidden aria-expanded:bg-neutral-300 aria-expanded:text-slate-700 sm:space-x-4',
          className,
        )}
      >
        <div className="my-auto flex flex-nowrap items-center space-x-2 py-2 text-base">
          <span className="flex items-center">
            <svg className="mr-4" width="35" height="35" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.5 0.499756C7.84 0.499756 0 8.33976 0 17.9998C0 27.6598 7.84 35.4998 17.5 35.4998C27.16 35.4998 35 27.6598 35 17.9998C35 8.33976 27.16 0.499756 17.5 0.499756ZM17.5 7.49976C20.8775 7.49976 23.625 10.2473 23.625 13.6248C23.625 17.0023 20.8775 19.7498 17.5 19.7498C14.1225 19.7498 11.375 17.0023 11.375 13.6248C11.375 10.2473 14.1225 7.49976 17.5 7.49976ZM17.5 31.9998C13.9475 31.9998 9.7475 30.5648 6.755 26.9598C9.7125 24.6498 13.44 23.2498 17.5 23.2498C21.56 23.2498 25.2875 24.6498 28.245 26.9598C25.2525 30.5648 21.0525 31.9998 17.5 31.9998Z"
                fill="#26374A"
              />
            </svg>
          </span>
          <span id="menu-label" className="ring-blue-hover ml-2 py-2 font-sans text-base font-bold">
            {name}
          </span>
        </div>
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} className="my-auto ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <UserName name={name} />
        <MenuItem
          to={t('gcweb:app.menu-dashboard.href', { baseUri: MSCA_BASE_URL })}
          className="text-deep-blue-dark hover:text-blue-hover flex justify-between text-base focus:bg-white"
        >
          {t('gcweb:app.menu-dashboard')}
        </MenuItem>
        <DropdownMenuSeparator />
        <MenuItem
          to={t('gcweb:app.profile.href', { baseUri: MSCA_BASE_URL })}
          className="text-deep-blue-dark hover:text-blue-hover flex justify-between text-base focus:bg-white"
        >
          {t('gcweb:app.profile')}
        </MenuItem>
        <DropdownMenuSeparator />
        {SHOW_INBOX_MENU && (
          <>
            <MenuItem
              to={t('gcweb:app.inbox.href', { baseUri: MSCA_BASE_URL })}
              className="text-deep-blue-dark hover:text-blue-hover flex justify-between text-base focus:bg-white"
            >
              {t('gcweb:app.inbox')}
            </MenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <MenuItem
          to={t('gcweb:app.security-settings.href', { baseUri: MSCA_BASE_URL })}
          className="text-deep-blue-dark hover:text-blue-hover flex justify-between text-base focus:bg-white"
        >
          {t('gcweb:app.security-settings')}
        </MenuItem>
        <DropdownMenuSeparator />
        <MenuItem
          to={t('gcweb:app.contact-us.href', { baseUri: MSCA_BASE_URL })}
          className="text-deep-blue-dark hover:text-blue-hover flex justify-between text-base focus:bg-white"
        >
          {t('gcweb:app.contact-us')}
        </MenuItem>
        <DropdownMenuSeparator />
        <MenuItem
          to={`/auth/logout?lang=${currentLanguage}`}
          className="text-deep-blue-dark hover:text-blue-hover flex justify-between text-base focus:bg-white"
        >
          {t('gcweb:app.logout')}
          <FontAwesomeIcon icon={faRightFromBracket} className="my-auto size-8" />
        </MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type UserNameProps = {
  name?: string;
};

function UserName({ name }: UserNameProps): JSX.Element {
  return (
    <>
      {name !== undefined && (
        <DropdownMenuLabel className="text-md flex items-center border-b-2 border-slate-600 px-3 py-2 text-gray-300 sm:hidden">
          <FontAwesomeIcon icon={faUser} className="mr-2 size-4" />
          {name}
        </DropdownMenuLabel>
      )}
    </>
  );
}
