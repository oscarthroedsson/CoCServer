export function convertToCorrectDateObject(date: string) {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hours = date.slice(9, 11);
  const minutes = date.slice(11, 13);
  const seconds = date.slice(13, 15);

  // Skapa en ISO 8601-kompatibel datumsträng
  const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

  return new Date(formattedDateString);
}
