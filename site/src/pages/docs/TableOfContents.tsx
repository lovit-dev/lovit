import React, { useCallback, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { HeadingItem, useHeadings } from '../../hooks/useHeadings';
import { cn } from '../../utils/cn';

export default function TableOfContents() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close TOC when clicking outside (mobile only)
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div
      ref={navRef}
      className='absolute top-20 right-4 z-99 scrollbar-none h-fit pl-7 text-sm lg:right-13 xl:sticky xl:top-28 xl:right-0 xl:min-w-3xs'
    >
      <nav className='group group-focus-within:pointer-events-auto'>
        <button
          className='group mb-1 ml-auto flex items-center gap-x-1 border-none p-2 text-grey-light outline-none xl:ml-0 xl:cursor-text! xl:p-0'
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls='toc-list'
        >
          <strong>On this page</strong>
          <FaAngleDown
            className={cn('-rotate-90 transition-[rotate] duration-250 group-focus-within:rotate-0 xl:hidden')}
          />
        </button>
        <HeadingList tocOpen={open} setTocOpen={setOpen} />
      </nav>
    </div>
  );
}

function HeadingList({ tocOpen, setTocOpen }: { tocOpen?: boolean; setTocOpen?: (v: boolean) => void }) {
  const headings = useHeadings();
  return (
    <ul
      id='toc-list'
      className={cn(
        'pointer-events-none invisible scrollbar-thin h-0 max-h-fit overflow-y-auto rounded-tl-md rounded-b-md bg-black p-3 opacity-0 transition-all duration-250 scrollbar-thumb-black-light-2 scrollbar-track-transparent group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:h-[calc(100vh-var(--container-header-height)-3rem)] group-focus-within:opacity-100 xl:pointer-events-auto xl:visible xl:h-fit xl:p-0 xl:opacity-100',
        tocOpen && 'pointer-events-auto visible h-[calc(100vh-var(--container-header-height)-3rem)] opacity-100'
      )}
    >
      {headings.map(({ id, title, items }) => (
        <li key={id} className='py-1.5 text-sm font-medium text-grey'>
          <NavLink id={id} title={title} setTocOpen={setTocOpen} />
          {items.length > 0 && <NestedHeadingList items={items} setTocOpen={setTocOpen} />}
        </li>
      ))}
    </ul>
  );
}

function NestedHeadingList({ items, setTocOpen }: { items: HeadingItem[]; setTocOpen?: (v: boolean) => void }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id} className='ml-3 py-1'>
            <NavLink id={item.id} title={item.title} setTocOpen={setTocOpen} />
          </li>
        );
      })}
    </ul>
  );
}

function NavLink({ id, title, setTocOpen }: HeadingItem & { setTocOpen?: (v: boolean) => void }) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Use querySelector instead of getElementById for anchor navigation
      const el = document.querySelector(`#${CSS.escape(id)}`);
      // Detect mobile/tablet by checking if setTocOpen exists (only passed on mobile)
      const isMobile = !!setTocOpen && window.innerWidth < 1280;
      if (el) {
        // Safari smooth scroll workaround
        const supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;
        if (supportsSmoothScroll) {
          e.preventDefault();
          if (isMobile && setTocOpen) {
            setTocOpen(false);
            setTimeout(() => {
              (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
              history.replaceState(null, '', `#${id}`);
            }, 250); // Wait for TOC to close/transition
          } else {
            (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', `#${id}`);
          }
        }
        // else: let default anchor behavior happen
      }
      // else: let default anchor behavior happen
    },
    [id, setTocOpen]
  );
  return (
    <a
      href={`#${id}`}
      className='inline-block w-full transition-[color] duration-250 hover:text-grey-light xl:w-fit'
      onClick={handleClick}
    >
      {title}
    </a>
  );
}
