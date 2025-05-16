import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ApiPath, GuidePath, SocialLinks } from '../../constants';
import { usePageNavigation } from '../../hooks/usePageNavigation';
import { getBasePath } from '../../utils/getBasePath';
import { getSlugs } from '../../utils/getSlugs';

function Footer() {
  const { current, previous, next } = usePageNavigation(getSlugs(GuidePath, ApiPath));
  // TODO: This is a temporary fallback for currentSlug.
  // It must be refactored.
  const currentSlug = (current?.slug ??
    (getBasePath(next?.slug as string) === GuidePath.Base ? GuidePath.GettingStarted : ApiPath.FetchLovit)) as
    | GuidePath
    | ApiPath;

  const fileName =
    currentSlug === GuidePath.GettingStarted || currentSlug === ApiPath.FetchLovit ? 'index' : currentSlug;

  return (
    <footer className='mt-14'>
      <Link
        to={`${SocialLinks.Github}/edit/main/site/docs${getBasePath(currentSlug)}/${fileName}.mdx`}
        className='flex w-full cursor-pointer items-center gap-x-1 border-b border-black-light-2 p-1 pb-4 text-sm text-primary'
      >
        <FaRegEdit />
        <span>Suggest changes to this page</span>
      </Link>
      <div className='mt-6 flex justify-end gap-x-6'>
        {previous && <FooterLink label='Previous Page' title={previous.title} slug={previous.slug} />}
        {next && <FooterLink label='Next Page' title={next.title} slug={next.slug} />}
      </div>
    </footer>
  );
}

function FooterLink({ title, label, slug }: { title: string; label: string; slug: string }) {
  return (
    <Link
      to={`${getBasePath(slug)}/${slug}`}
      className='flex w-1/2 flex-col rounded-lg border border-black-light-2 p-3 transition-[border] duration-250 hover:border-primary'
    >
      <span className='text-xs text-grey'>{label}</span>
      <span className='mt-1.5 text-sm text-primary'>{title}</span>
    </Link>
  );
}

export default Footer;
