/**
 *
 * @param hourString
 * @returns Converts the hourString to number and then into minutes
 */

export function convertHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);

  const minutesAmount = hours * 60 + minutes;

  return minutesAmount;
}
