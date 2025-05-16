import { useLocation } from 'react-router-dom';
import { formatSlug } from '../utils/formatSlug';
import { getBasePath } from '../utils/getBasePath';

export const usePageNavigation = (slugs: string[]) => {
  const { pathname } = useLocation();
  const currentSlug = pathname.split('/').pop() || '';
  const currentIndex = slugs.indexOf(currentSlug);

  const getPage = (index: number) => {
    const slug = slugs[index];

    if (!slug) {
      return;
    }

    return {
      title: formatSlug(getBasePath(slug), slug),
      slug
    };
  };

  return {
    previous: getPage(currentIndex - 1),
    next: getPage(currentIndex + 1),
    current: getPage(currentIndex)
  };
};
