export const extractFileNameFromUrl = (url: string): string => {
  // Decode URL to handle any encoded characters (e.g., %20 for spaces)
  const decodedUrl = decodeURIComponent(url);
  // Extract the file name (last part of the URL)
  const fileName = decodedUrl.split("/").pop();

  if (!fileName) {
    throw new Error("File name could not be extracted from the URL.");
  }
  return fileName;
};

export const extractFolderNameFromUrl = (url: string): string => {
  // Extract the file name (last part of the URL)
  const fileName = url.split("/").pop();

  const formattedFileName = fileName
    .toLowerCase()
    .replace("-", "")
    .replace("%", "");

  if (!fileName) {
    throw new Error("File name could not be extracted from the URL.");
  }

  return formattedFileName;
};
