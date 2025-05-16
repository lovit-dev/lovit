export const getSlugs = (...paths: { Base: string; [key: string]: string }[]) => {
  return paths.flatMap(({ Base, ...rest }) => Object.values(rest).filter((slug) => slug !== Base));
};
