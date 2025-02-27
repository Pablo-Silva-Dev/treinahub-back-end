import * as moment from "moment";

const secondsToFullTimeString = (durationInSeconds: number): string => {
  const timeConversion = moment.duration(durationInSeconds, "seconds");
  const hours = timeConversion.hours();
  const minutes = timeConversion.minutes();
  const seconds = timeConversion.seconds();
  return `${hours <= 10 ? "0" + hours : hours}:${minutes <= 10 ? "0" + minutes : minutes}:${seconds <= 10 ? "0" + seconds : seconds}`;
};

const secondsToFullTimeStringV2 = (durationInSeconds: number): string => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  const hourString = hours > 0 ? `${hours} hora${hours > 1 ? "s" : ""}` : "";
  const minuteString =
    minutes > 0 ? `${minutes} minuto${minutes > 1 ? "s" : ""}` : "";
  const secondString =
    seconds > 0 ? `${seconds} segundo${seconds > 1 ? "s" : ""}` : "";

  if (hours > 0) {
    return `${hourString}${minutes > 0 ? ` e ${minuteString}` : ""}`;
  } else if (minutes > 0) {
    return `${minuteString}${seconds > 0 ? ` e ${secondString}` : ""}`;
  } else {
    return secondString;
  }
};

const secondsToHours = (durationInSeconds: number): string => {
  let hours = Math.fround(durationInSeconds / 3600);
  if (hours <= 0.1) {
    hours = 0.1;
  }
  let formattedHours =
    hours === 1 ? hours.toPrecision(1) : hours.toPrecision(2);
  return `${hours === 1 ? `${formattedHours} hora` : `${formattedHours} horas`}`;
};

export { secondsToFullTimeString, secondsToFullTimeStringV2, secondsToHours };
