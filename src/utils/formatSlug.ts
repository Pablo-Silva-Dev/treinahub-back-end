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

export function formatSlugAzureEncodingManifestUrl(
  AzureStorageAccount: string,
  AzureContainerName: string,
  url: string,
  manifest: "dash" | "hls"
) {
  // Extract the file name from the URL
  const fileNameMatch = url.match(/\/([^\/]+)$/);
  if (!fileNameMatch) {
    throw new Error("Invalid URL format");
  }

  let fileName = fileNameMatch[1];

  // Remove accents, special characters, replace spaces with hyphens, and lowercase
  const from = "ÁÀÂÃÄáàâãäÉÈÊËéèêëÍÌÎÏíìîïÓÒÔÕÖóòôõöÚÙÛÜúùûüÑñÇç";
  const to = "AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuNnCc";

  fileName = fileName
    .split("")
    .map((letter, index) => {
      const accentIndex = from.indexOf(letter);
      return accentIndex !== -1 ? to[accentIndex] : letter;
    })
    .join("");

  fileName = fileName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // Insert '.' at the third position from the back
  if (fileName.length > 2) {
    fileName = fileName.slice(0, -3) + "." + fileName.slice(-3);
  }

  // Construct the new URL
  const newBaseUrl = `https://${AzureStorageAccount}.blob.core.windows.net/${AzureContainerName}/`;
  const outputUrl =
    manifest === "dash"
      ? `${newBaseUrl}${fileName}/dash/manifest/stream.mpd`
      : `${newBaseUrl}${fileName}/hls/manifest/stream.m3u8`;

  return outputUrl;
}
