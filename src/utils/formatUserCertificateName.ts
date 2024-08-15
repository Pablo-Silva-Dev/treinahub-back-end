export const formatUserCertificateName = (name: string) => {
  if (name.length > 30) {
    let formattedName = name.toUpperCase();
    const nameParts = formattedName.split(" ");
    if (nameParts.length >= 4) {
      formattedName = `${nameParts[0]} ${nameParts[1]} ${nameParts[2].charAt(0)} ${nameParts[3].charAt(0)} ${nameParts.slice(4).join(" ")}`;
    }
    return formattedName;
  }
  return name;
};
