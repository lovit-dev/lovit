import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export const variants = cva(
  'rounded-3xl whitespace-nowrap text-center px-5 font-semibold transition duration-250 text-sm py-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-black-light hover:bg-primary-light',
        secondary: 'bg-black-light-2 text-grey-light hover:bg-black-light-3',
        outlinePrimary:
          'border border-primary text-primary bg-transparent hover:bg-primary-light hover:text-black-light',
        outlineSecondary: 'border border-black-light-2 text-grey bg-transparent hover:bg-black-light-2'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

function Button({
  variant,
  className,
  ...props
}: VariantProps<typeof variants> & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={cn(variants({ variant, className }))} />;
}

export default Button;
