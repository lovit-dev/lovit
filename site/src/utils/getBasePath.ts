import { ApiPath, GuidePath } from '../constants';

export const getBasePath = (slug: string) => {
  const pathGroups = [GuidePath, ApiPath];

  for (const group of pathGroups) {
    const match = Object.values(group).includes(slug);
    if (match) {
      return group.Base;
    }
  }

  throw new Error(`Base path not found for slug: "${slug}"`);
};
