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
