import { CronSchedules } from "./types/cronSchedules.types";

export const cronExecutionTime: CronSchedules = {
  Every_Minute: "* * * * *",
  Every_ThreeHours: "0 */3 * * *",
  Every_SixHours: "0 */6 * * *",
  Every_TwelveHours: "0 */12 * * *",
  Every_Day: "0 0 * * *",
  Every_Monday: "0 0 * * 1",
  Every_Tuesday: "0 0 * * 2",
  Every_Wednesday: "0 0 * * 3",
  Every_Thursday: "0 0 * * 4",
  Every_Friday: "0 0 * * 5",
  Every_Saturday: "0 0 * * 6",
  Every_Sunday: "0 0 * * 0",
  Every_LastDayOfMonth: "0 0 28-31 * *",
  Every_FirstDayOfMonth: "0 0 1 * *",
  Every_DayFirstWeekOfMonth: "0 0 1-11 * *",
};
