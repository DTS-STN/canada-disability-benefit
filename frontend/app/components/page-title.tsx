import type { ComponentProps } from 'react';

import { cn } from '~/utils/tailwind-utils';

export type PageTitleProps = Omit<ComponentProps<'h1'>, 'id' | 'property'> & {
  subTitle?: string;
  subTitleClassName?: string;
};

export function PageTitle({ children, className, subTitle, subTitleClassName, ...props }: PageTitleProps) {
  return (
    <div className="mt-10 mb-8">
      {subTitle && <h2 className={subTitleClassName}>{subTitle}</h2>}
      <h1
        id="wb-cont"
        tabIndex={-1}
        className={cn(
          'text-[37px]/11 focus-visible:ring-3 md:text-[41px]/12',
          'after:mt-2 after:block after:h-1.5 after:w-18 after:bg-red-700',
          className,
        )}
        {...props}
      >
        {children}
      </h1>
    </div>
  );
}
