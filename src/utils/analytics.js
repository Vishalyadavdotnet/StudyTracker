// Get weekday from date string
export function getWeekday(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", { weekday: "short" }); // Mon, Tue...
}

// Aggregate hours per weekday
export function getHoursByWeekday(data) {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const result = weekdays.map((day) => ({ day, hours: 0 }));

  data.forEach((entry) => {
    const day = getWeekday(entry.date);
    const idx = weekdays.indexOf(day);
    if (idx >= 0) {
      result[idx].hours += entry.hours;
    }
  });

  return result;
}

// Aggregate weekday vs weekend
export function getWeekdayWeekend(data) {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weekend = ["Sat", "Sun"];
  let weekdayHours = 0;
  let weekendHours = 0;

  data.forEach((entry) => {
    const day = getWeekday(entry.date);
    if (weekdays.includes(day)) weekdayHours += entry.hours;
    if (weekend.includes(day)) weekendHours += entry.hours;
  });

  return { weekdayHours, weekendHours };
}
