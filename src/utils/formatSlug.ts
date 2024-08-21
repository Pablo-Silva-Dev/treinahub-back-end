export const formatSlug = (slug: string) => {
  return slug.toLowerCase().replace(/ /g, "-");
};

export function formatSlugFileName(str: string): string {
  // Remove accents
  const from = "ÁÀÂÃÄáàâãäÉÈÊËéèêëÍÌÎÏíìîïÓÒÔÕÖóòôõöÚÙÛÜúùûüÑñÇç";
  const to = "AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuNnCc";

  str = str
    .split("")
    .map((letter) => {
      const accentIndex = from.indexOf(letter);
      return accentIndex !== -1 ? to[accentIndex] : letter;
    })
    .join("");

  // Remove special characters and replace spaces with hyphens
  str = str.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "-");

  str = str.toLowerCase();

  if (str.length > 2) {
    str = str.slice(0, -3) + "." + str.slice(-3);
  }

  return str;
}
