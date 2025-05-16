import { FaAngleDown } from 'react-icons/fa6';
import { HeadingItem, useHeadings } from '../../hooks/useHeadings';
import { cn } from '../../utils/cn';

export default function TableOfContents() {
  return (
    <div className='absolute top-20 right-4 z-99 scrollbar-none h-fit pl-7 text-sm lg:right-13 xl:sticky xl:top-28 xl:right-0 xl:min-w-3xs'>
      <nav className='group group-focus-within:pointer-events-auto'>
        <button
          className='group mb-1 ml-auto flex items-center gap-x-1 border-none p-2 text-grey-light outline-none xl:ml-0 xl:cursor-text! xl:p-0'
          onClick={(e) => e.currentTarget.focus()}
        >
          <strong>On this page</strong>
          <FaAngleDown
            className={cn('-rotate-90 transition-[rotate] duration-250 group-focus-within:rotate-0 xl:hidden')}
          />
        </button>
        <HeadingList />
      </nav>
    </div>
  );
}

function HeadingList() {
  const headings = useHeadings();

  return (
    <ul
      className={cn(
        'pointer-events-none invisible scrollbar-thin h-0 max-h-fit overflow-y-auto rounded-tl-md rounded-b-md bg-black p-3 opacity-0 transition-all duration-250 scrollbar-thumb-black-light-2 scrollbar-track-transparent group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:h-[calc(100vh-var(--container-header-height)-3rem)] group-focus-within:opacity-100 xl:pointer-events-auto xl:visible xl:h-fit xl:p-0 xl:opacity-100'
      )}
    >
      {headings.map(({ id, title, items }) => (
        <li key={id} className='py-1.5 text-sm font-medium text-grey'>
          <NavLink id={id} title={title} />
          {items.length > 0 && <NestedHeadingList items={items} />}
        </li>
      ))}
    </ul>
  );
}

function NestedHeadingList({ items }: { items: HeadingItem[] }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id} className='ml-3 py-1'>
            <NavLink id={item.id} title={item.title} />
          </li>
        );
      })}
    </ul>
  );
}

function NavLink({ id, title }: HeadingItem) {
  return (
    <a href={`#${id}`} className='inline-block w-full transition-[color] duration-250 hover:text-grey-light xl:w-fit'>
      {title}
    </a>
  );
}
