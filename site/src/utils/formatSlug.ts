import { ApiPath } from '../constants';
import { BasePath } from '../typing';

export const formatSlug = (basePath: BasePath, slug: string) => {
  const words = slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return basePath === ApiPath.Base ? words.join('') : words.join(' ');
};
