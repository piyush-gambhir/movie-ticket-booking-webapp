/**
 * Converts a given timestamp to a formatted date and time string.
 *
 * @param {number} timestamp - The timestamp to convert (in milliseconds).
 * @param {string} locale - The locale string (e.g., 'en-US').
 * @param {object} dateOptions - Formatting options for the date.
 * @param {object} timeOptions - Formatting options for the time.
 * @returns {object} An object containing the formatted date and time strings.
 */

export function convertTimestamp(
  timestamp,
  locale = "en-US",
  dateOptions = { year: "numeric", month: "long", day: "2-digit" },
  timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  },
) {
  try {
    const date = new Date(timestamp);

    const formattedDate = new Intl.DateTimeFormat(locale, dateOptions).format(
      date,
    );
    const formattedTime = new Intl.DateTimeFormat(locale, timeOptions).format(
      date,
    );

    return {
      date: formattedDate,
      time: formattedTime,
    };
  } catch (error) {
    console.error("Invalid timestamp provided", error);
    return {
      date: "Invalid date",
      time: "Invalid time",
    };
  }
}
