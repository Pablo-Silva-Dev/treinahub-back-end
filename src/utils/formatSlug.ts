export const formatSlug = (slug: string) => {
  return slug.toLowerCase().replace(/ /g, "-");
};
