import type { ComponentProps } from 'react';

import { ButtonEndIcon, ButtonStartIcon } from '~/components/button-icons';
import { cn } from '~/utils/tailwind-utils';

type ButtonEndIconProps = ComponentProps<typeof ButtonEndIcon>;
type ButtonStartIconProps = ComponentProps<typeof ButtonStartIcon>;

const sizes = {
  xs: 'px-[12px] py-2.5 text-mobile-size',
  sm: 'px-[12px] py-2.5 text-mobile-size',
  md: 'px-[15px] py-2.5 text-regular-size',
  base: 'px-[15px] py-2.5 text-regular-size',
  lg: 'px-[15px] py-2.5 text-regular-size',
  custom: 'px-[15px] py-2.5 text-regular-size',
} as const;

// prettier-ignore
const variants = {
  alternative: 'border-gray-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:bg-gray-100 focus:text-blue-700',
  default: 'border-gray-300 bg-gray-200 text-slate-700 hover:bg-neutral-300 focus:bg-neutral-300',
  dark: 'border-gray-800 bg-gray-800 text-white hover:bg-gray-900 focus:bg-gray-900',
  green: 'border-green-700 bg-green-700 text-white hover:bg-green-800 focus:bg-green-800',
  primary: 'text-white bg-blue-primary hover:bg-deep-blue-focus active:bg-blue-pressed rounded focus:ring focus:ring-offset-4 focus:ring-deep-blue-60f focus:ring-bg-deep-blue-focus',
  red: 'border-red-700 bg-red-700 text-white hover:bg-red-800 focus:bg-red-800',
  link: 'border-0 bg-white text-gray-900 underline hover:bg-gray-100 hover:text-blue-700 focus:bg-gray-100 focus:text-blue-700',
  ghost: 'border-0 hover:bg-neutral-100 hover:text-neutral-900',
  outline: "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 disabled:text-neutral-500",
} as const;

export interface ButtonProps extends ComponentProps<'button'> {
  endIcon?: ButtonEndIconProps['icon'];
  endIconProps?: OmitStrict<ButtonEndIconProps, 'icon'>;
  pill?: boolean;
  size?: keyof typeof sizes;
  startIcon?: ButtonStartIconProps['icon'];
  startIconProps?: OmitStrict<ButtonStartIconProps, 'icon'>;
  variant?: keyof typeof variants;
}

/**
 * Tailwind CSS Buttons from Flowbite
 * @see https://flowbite.com/docs/components/buttons/
 */
export function Button({
  children,
  className,
  endIcon,
  endIconProps,
  pill,
  size = 'base',
  startIcon,
  startIconProps,
  variant = 'default',
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    'ml-1 inline-flex items-center justify-center rounded border align-middle font-sans text-lg/7 font-medium outline-offset-4 sm:text-xl/8 md:ml-2',
    sizes[size],
    variants[variant],
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70',
    pill && 'rounded-full',
    className,
  );
  return (
    <button className={buttonClassName} {...props}>
      {startIcon && <ButtonStartIcon {...(startIconProps ?? {})} icon={startIcon} />}
      {children}
      {endIcon && <ButtonEndIcon {...(endIconProps ?? {})} icon={endIcon} />}
    </button>
  );
}
