export function getFirstToLastThisMonth(): { first: Date; last: Date } {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Skapa första dagen i den aktuella månaden
  const firstThisMonth = new Date(currentYear, currentMonth, 1, 0, 0, 0);

  // Skapa första dagen i nästa månad
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1; // Hantera övergång till nästa år
  const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;
  const firstNextMonth = new Date(nextYear, nextMonth, 1, 0, 0, 0);

  // Subtrahera 1 dag från första dagen i nästa månad för att få sista dagen i den aktuella månaden
  const lastThisMonth = new Date(firstNextMonth.getTime() - 1);

  return { first: firstThisMonth, last: lastThisMonth };
}
