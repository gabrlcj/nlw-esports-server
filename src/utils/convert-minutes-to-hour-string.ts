/**
 *
 * @param minutesAmount
 * @returns Converts the minutesAmount to string and then into hours
 */

export function convertMinutesToHoutString(minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60);

  const minutes = minutesAmount % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}
