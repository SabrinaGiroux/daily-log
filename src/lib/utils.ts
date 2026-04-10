// Displays date in a nicer format
// Ex: Thursday, April 9th
export const formatDisplayDate = (dateString: string) => {
  // Parse as local time by appending T00:00:00 — without this,
  // new Date("YYYY-MM-DD") is treated as UTC and can shift the day
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};
