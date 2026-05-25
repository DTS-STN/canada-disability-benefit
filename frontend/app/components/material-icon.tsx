// react-material-symbols currently does not work with the current react 19
// using svg icons until we find a better replacement
import type { JSX } from 'react';

import { faChevronRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'material-symbols/outlined.css';

// TODO: replace icons with more accurate ones.
// using the currently avaliable icons as substitutes for now

const MaterialIcon: Record<string, JSX.Element> = {
  'chevron-right': <FontAwesomeIcon icon={faChevronRight} />,
  'demography': <span className="material-symbols-outlined text-2xl">demography</span>,
  'lock': <span className="material-symbols-outlined text-2xl">lock</span>,
  'mail': <span className="material-symbols-outlined text-2xl">mail</span>,
  'notifications-active': <span className="material-symbols-outlined text-2xl">notifications_active</span>,
  'notification-active': (
    <span className="material-symbols-outlined" style={{ fontSize: '44px' }}>
      notifications_active
    </span>
  ),
  'notification-active-m': (
    <span className="material-symbols-outlined" style={{ fontSize: '35px' }}>
      notifications_active
    </span>
  ),
  'warning': (
    <FontAwesomeIcon
      icon={faTriangleExclamation}
      transform="grow-10"
      color="orange"
      className="material-symbols-outlined text-xl"
    />
  ),
  'logout': (
    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
      logout
    </span>
  ),
};

export function getIcon(icon?: string) {
  if (!icon || !(icon in MaterialIcon)) {
    return <></>;
  }
  return MaterialIcon[icon];
}
