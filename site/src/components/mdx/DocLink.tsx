import { Link } from 'react-router-dom';

function DocLink({ children, href }: { children: string; href: string }) {
  const isExternal = href.startsWith('https://');
  const className =
    'text-primary hover:text-primary-light transition-colors duration-250 hover:border-primary-light border-b';

  if (isExternal) {
    return (
      <a className={className} href={href} target='_blank' rel='noopener'>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={href}>
      {children}
    </Link>
  );
}

export default DocLink;
