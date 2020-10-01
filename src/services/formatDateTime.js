import { formatDateWithOptions } from "./formatDateWithOptions";

export function formatDateTime(date, options) {
  return formatDateWithOptions(date, {
    pattern: "dd/MMM/yy HH:mm:ss",
    ...options,
  });
}
