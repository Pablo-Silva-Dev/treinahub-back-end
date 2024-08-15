import * as moment from "moment";

export const formatDateNow = () => {
  const now = moment();
  return now.format("DD/MM/YYYY");
};
