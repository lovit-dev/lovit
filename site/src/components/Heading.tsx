import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { cn } from '../utils/cn';

const variants = cva('text-grey-light font-bold', {
  variants: {
    as: {
      h1: 'text-4xl sm:text-6xl sm:leading-16',
      h2: 'text-3xl sm:text-5xl',
      h3: 'text-base'
    }
  },

  defaultVariants: {
    as: 'h1'
  }
});

function Heading({
  children,
  as,
  className
}: { children: ReactNode; className?: string } & VariantProps<typeof variants>) {
  const Component = as ?? 'h1';

  return <Component className={cn(variants({ as, className }))}>{children}</Component>;
}

export default Heading;
