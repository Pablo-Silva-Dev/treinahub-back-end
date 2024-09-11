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
