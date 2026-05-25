import type { ComponentProps } from 'react';

import { ButtonEndIcon, ButtonStartIcon } from '~/components/button-icons';
import { AppLink } from '~/components/links';
import { cn } from '~/utils/tailwind-utils';

type ButtonEndIconProps = ComponentProps<typeof ButtonEndIcon>;
type ButtonStartIconProps = ComponentProps<typeof ButtonStartIcon>;

const sizes = {
  xs: 'px-[12px] py-2.5 text-mobile-size',
  sm: 'px-[12px] py-2.5 text-mobile-size',
  base: 'px-[15px] py-2.5 text-regular-size',
  md: 'px-[15px] py-2.5 text-regular-size',
  lg: 'px-[15px] py-2.5 text-regular-size',
  custom: 'px-[15px] py-2.5 text-regular-size',
} as const;

// prettier-ignore
const variants = {
  alternative: 'text-blue-60b bg-gray-30a hover:bg-gray-50a active:bg-gray-60 focus:bg-gray-60 focus:ring-deep-blue-60f focus:ring-bg-gray-50a',
  default: 'border-gray-300 bg-gray-200 text-slate-700 hover:bg-neutral-300 focus:bg-neutral-300',
  dark: 'border-gray-800 bg-gray-800 text-white hover:bg-gray-900 focus:bg-gray-900',
  green: 'border-green-700 bg-green-700 text-white hover:bg-green-800 focus:bg-green-800',
  primary: 'text-white bg-blue-primary hover:bg-deep-blue-focus active:bg-blue-pressed rounded focus:ring focus:ring-offset-4 focus:ring-deep-blue-60f focus:ring-bg-deep-blue-focus',
  red: 'border-red-700 bg-red-700 text-white hover:bg-red-800 focus:bg-red-800',
  link: 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:bg-gray-100 focus:text-blue-700 border-0 underline',
} as const;

type ButtonLinkStyleProps = {
  className?: string;
  pill?: boolean;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

type ButtonLinkProps = ComponentProps<typeof AppLink> &
  ButtonLinkStyleProps & {
    disabled?: boolean;
    endIcon?: ButtonEndIconProps['icon'];
    endIconProps?: OmitStrict<ButtonEndIconProps, 'icon'>;
    startIcon?: ButtonStartIconProps['icon'];
    startIconProps?: OmitStrict<ButtonStartIconProps, 'icon'>;
    refPageAA?: string;
  };

/**
 * Tailwind CSS Buttons from Flowbite
 * @see https://flowbite.com/docs/components/buttons/
 *
 * Disabling a link
 * @see https://www.scottohara.me/blog/2021/05/28/disabled-links.html
 */
export function ButtonLink({
  children,
  className,
  disabled,
  endIcon,
  endIconProps,
  pill,
  size = 'base',
  startIcon,
  startIconProps,
  variant = 'default',
  refPageAA = 'mscaPlaceholder',
  ...props
}: ButtonLinkProps) {
  return (
    <AppLink
      className={cn(
        'inline-flex items-center justify-center rounded-sm border px-3 py-2.5 align-middle font-sans no-underline outline-offset-4 md:px-[15px]',
        sizes[size],
        variants[variant],
        disabled && 'pointer-events-none cursor-not-allowed opacity-70',
        pill && 'rounded-full',
        className,
      )}
      data-gc-analytics-customclick={`${refPageAA}`}
      disabled={disabled}
      {...props}
    >
      {startIcon && <ButtonStartIcon {...(startIconProps ?? {})} icon={startIcon} />}
      {children}
      {endIcon && <ButtonEndIcon {...(endIconProps ?? {})} icon={endIcon} />}
    </AppLink>
  );
}
