import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

const variants = cva('text-grey-light my-4 w-full rounded-lg px-4 pb-2 pt-4 text-sm', {
  variants: {
    type: {
      warning: 'bg-warning',
      info: 'bg-info'
    }
  },
  defaultVariants: {
    type: 'warning'
  }
});

function Callout({ children, type }: { children: ReactNode } & VariantProps<typeof variants>) {
  const title = type ?? 'warning';

  return (
    <div className={cn(variants({ type }))}>
      <span className='block font-semibold'>{title.toUpperCase()}</span>
      <p className='my-2'>{(children as any).props?.children ?? children}</p>
    </div>
  );
}

export default Callout;
