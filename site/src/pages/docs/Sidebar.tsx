import { FaEllipsis } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { ApiPath, GuidePath } from '../../constants';
import { formatSlug } from '../../utils/formatSlug';
import { getBasePath } from '../../utils/getBasePath';
import { getSlugs } from '../../utils/getSlugs';

function Sidebar() {
  return (
    <div className='z-999'>
      <button
        onClick={(e) => e.currentTarget.focus()}
        className='fixed top-6 left-6 border-none outline-none lg:hidden focus:[&+aside]:translate-x-0'
      >
        <FaEllipsis className='text-xl text-grey-light' />
      </button>
      <aside className='fixed scrollbar-thin h-[calc(100vh-var(--container-header-height))] max-h-fit w-48 -translate-x-full overflow-y-auto rounded-b-md bg-black pr-4 pl-4 transition-[translate] duration-250 scrollbar-thumb-black-light-2 scrollbar-track-transparent hover:scrollbar-thumb-black-light-3 lg:sticky lg:top-20 lg:ml-8 lg:h-fit lg:translate-x-0 lg:pr-0'>
        <nav>
          <ul>
            <NavSection title='INTRODUCTION' slugs={getSlugs(GuidePath)} />
            <NavSection title='API' slugs={getSlugs(ApiPath)} />
          </ul>
        </nav>
      </aside>
    </div>
  );
}

function NavSection({ title, slugs }: { title: string; slugs: string[] }) {
  return (
    <li className='z-99 border-t border-black-light-2 py-6 first:border-t-0'>
      <strong className='mx-3 mb-2 block text-sm font-semibold text-grey-light'>{title}</strong>
      <ul>
        {slugs.map((route) => (
          <NavigationLink key={route} slug={route} />
        ))}
      </ul>
    </li>
  );
}

function NavigationLink({ slug }: { slug: string }) {
  const basePath = getBasePath(slug);

  return (
    <li>
      <NavLink
        to={`${basePath}/${slug}`}
        className='block cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium text-grey transition-[background-color] duration-250 hover:bg-black-light'
      >
        {formatSlug(basePath, slug)}
      </NavLink>
    </li>
  );
}

export default Sidebar;
