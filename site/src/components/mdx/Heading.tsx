import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { slugify } from '../../utils/slugify';

const variants = cva('text-grey-light font-bold', {
  variants: {
    as: {
      h1: 'mb-4 text-3xl',
      h2: 'border-black-light-2 mt-12 mb-4 border-t pt-6 text-2xl',
      h3: 'my-6 text-lg'
    }
  },
  defaultVariants: {
    as: 'h1'
  }
});

function Heading({ children, as }: { children: ReactNode } & VariantProps<typeof variants>) {
  const Component = as ?? 'h1';
  const slug: string = (children as any)?.props?.children ?? children;

  return (
    <Component className={cn(variants({ as }))} id={slugify(slug)}>
      {children}
    </Component>
  );
}

export default Heading;
