import { convertToCorrectDateObject } from "../utils/helpers/converToCorrectDateObj";

export function convertToCWLGroupObject_model(startTime: string, endTime: string) {
  return {
    seasonYear: convertToCorrectDateObject(startTime).getFullYear(),
    seasonMonth: convertToCorrectDateObject(endTime).getMonth(),
  };
}
