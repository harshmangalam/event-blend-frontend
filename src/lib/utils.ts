import { differenceInDays, isToday, isYesterday, isTomorrow } from "date-fns";

export function formatEventDateDifference(eventDate: string) {
  const currentDate = new Date();
  const daysDifference = differenceInDays(eventDate, currentDate);

  let humanReadableFormat;

  if (isToday(eventDate)) {
    humanReadableFormat = "Today";
  } else if (isYesterday(eventDate)) {
    humanReadableFormat = "Yesterday";
  } else if (isTomorrow(eventDate)) {
    humanReadableFormat = "Tomorrow";
  } else if (daysDifference > 0) {
    humanReadableFormat = `in ${daysDifference} days`;
  } else {
    humanReadableFormat = `${Math.abs(daysDifference)} days ago`;
  }

  return humanReadableFormat;
}

export function getGravatarUrlWithResolution(
  url: string,
  resolution: number,
): string | null {
  // Regular expression to check if the URL is a valid Gravatar URL
  const gravatarUrlRegex =
    /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]{32}/i;

  // Ensure the input URL is a valid Gravatar URL
  if (!gravatarUrlRegex.test(url)) {
    console.error("Invalid Gravatar URL.");
    return null;
  }

  // Ensure the resolution is a positive number within the allowed range
  if (resolution < 1 || resolution > 2048) {
    console.error("Resolution must be between 1 and 2048.");
    return null;
  }

  // Append or replace the size parameter in the URL
  const urlObj = new URL(url);
  urlObj.searchParams.set("s", resolution.toString());

  // Return the modified URL
  return urlObj.toString();
}
