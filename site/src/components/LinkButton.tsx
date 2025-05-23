import { VariantProps } from 'class-variance-authority';
import { Link, LinkProps } from 'react-router-dom';
import { cn } from '../utils/cn';
import { variants } from './Button';

function LinkButton({ variant, to, className, ...props }: VariantProps<typeof variants> & LinkProps) {
  const isExternal = typeof to === 'string' && to.startsWith('https://');
  const classes = cn(variants({ variant, className }));

  if (isExternal) {
    return <a href={to} className={classes} target='_blank' rel='noreferrer noopener' {...props} />;
  }

  return <Link to={to} className={classes} {...props} />;
}

export default LinkButton;
