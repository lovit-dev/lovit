import { ReactNode, useState } from 'react';
import { IconType } from 'react-icons';
import {
  FaAlignRight,
  FaAngleDown,
  FaDiscord,
  FaGithub,
  FaMagnifyingGlass,
  FaXmark,
  FaXTwitter
} from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';
import { ApiPath, GuidePath, Path, SocialLinks, VERSION } from '../constants';
import { cn } from '../utils/cn';
import LinkButton from './LinkButton';
import logoSmall from '/brand/logo-small.png';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-999 flex h-(--container-header-height) items-center border-b border-black-light-2 bg-black transition-[border] duration-300 ease-out lg:px-8'
      )}
    >
      <div className='mx-auto flex w-full max-w-8xl items-center justify-between px-6'>
        <div className='size-5 lg:hidden'>&nbsp;</div>
        <div className='flex items-center gap-x-10'>
          <Link to={Path.Home} className='flex items-center gap-x-1 lg:pl-0'>
            <img src={logoSmall} alt='Lovit Logo' className='size-10 lg:size-6' />
            <span className='hidden text-base font-semibold text-grey-light lg:inline-block'>Lovit</span>
          </Link>
          <form className='group relative hidden w-40 cursor-not-allowed items-center text-sm lg:flex'>
            <input
              className='w-full cursor-not-allowed rounded-lg bg-black-dark p-2.5 pl-9 placeholder:text-grey'
              type='text'
              placeholder='Search'
              disabled
              aria-label='Search input'
            />
            <FaMagnifyingGlass className='absolute left-3 text-sm text-grey' aria-hidden='true' />
            <kbd className='absolute right-3 rounded-sm border border-black-light-2 px-1.5 py-0.5 text-xs font-semibold text-grey'>
              Ctrl K
            </kbd>
            <span
              className='absolute bottom-0 left-1/2 -z-99 -translate-x-1/2 rounded-sm bg-black-dark px-1.5 text-sm text-grey transition-transform duration-250 ease-in-out group-hover:translate-y-7'
              aria-hidden='true'
            >
              soon
            </span>
          </form>
        </div>
        <div
          className={cn(
            'pointer-events-none invisible fixed top-16 -ml-6 h-[calc(100vh-var(--container-header-height))] w-full overflow-y-auto bg-black opacity-0 transition-all duration-250 lg:pointer-events-auto lg:visible lg:static lg:h-auto lg:w-fit lg:bg-transparent lg:opacity-100',
            {
              'pointer-events-auto visible opacity-100': open
            }
          )}
        >
          <nav className='mx-auto my-11 flex w-2xs flex-col items-center gap-5 lg:my-0 lg:w-full lg:flex-row'>
            <ul className='flex w-full flex-col items-start gap-x-3 gap-y-3 divide-y text-sm font-medium text-grey-light lg:flex-row lg:items-center [&>*]:w-full [&>*]:border-b [&>*]:border-black-light-2 [&>*]:py-3 lg:[&>*]:border-none lg:[&>*]:py-0'>
              <NavigationLink to={GuidePath.Base}>Docs</NavigationLink>
              <NavigationLink to={ApiPath.Base}>API</NavigationLink>
              <NavigationLink to={`${GuidePath.Base}/${GuidePath.Usage}`}>Usage</NavigationLink>
              <li>
                <Link
                  to={Path.Home}
                  className='flex items-center gap-0.5 rounded-sm px-1.5 py-1 transition-colors duration-250 hover:text-grey'
                >
                  <span>{VERSION}</span>
                  <FaAngleDown />
                </Link>
              </li>
            </ul>
            <Divider />
            <ul className='flex items-center gap-x-4'>
              <SocialLink href={SocialLinks.Github} icon={FaGithub} />
              <SocialLink href={SocialLinks.Discord} icon={FaDiscord} />
              <SocialLink href={SocialLinks.X} icon={FaXTwitter} />
            </ul>
            <Divider />
            <LinkButton
              to={SocialLinks.Github}
              className='w-full bg-gradient-to-r from-black-light-2 to-black-light-2 text-grey hover:from-primary hover:via-primary-light hover:to-secondary hover:text-black'
            >
              Give a Star ⭐
            </LinkButton>
          </nav>
        </div>
        <div className='block lg:hidden'>
          <button
            aria-expanded={open}
            aria-controls='mobile-menu'
            aria-label='Toggle menu'
            onClick={() => setOpen(!open)}
            className='block py-3 text-xl text-grey lg:hidden'
          >
            {open ? <FaXmark /> : <FaAlignRight />}
          </button>
        </div>
      </div>
    </header>
  );
}

function SocialLink({ icon: Icon, href }: { icon: IconType; href: string }) {
  return (
    <li>
      <a href={href} target='_blank' rel='noreferrer noopener'>
        <Icon className='text-xl text-grey transition-colors duration-250 hover:text-grey-light' />
      </a>
    </li>
  );
}

function NavigationLink({ children, to }: { children: ReactNode; to: string }) {
  return (
    <li>
      <NavLink to={to} className='rounded-sm py-1 transition-colors duration-250 hover:text-primary lg:px-1.5'>
        {children}
      </NavLink>
    </li>
  );
}

function Divider() {
  return <span className='hidden h-6 w-px bg-black-light-2 lg:inline-block' />;
}
