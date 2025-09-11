// src/utils/timeOfDay.js

// Determine which time slot a study session belongs to
export function getTimeOfDayLabel(timeStr) {
  const hour = parseInt(timeStr.split(":")[0], 10);
  if (hour >= 5 && hour <= 11) return "Morning";
  if (hour >= 12 && hour <= 16) return "Afternoon";
  if (hour >= 17 && hour <= 20) return "Evening";
  return "Night"; // 21-23 or 0-4
}

// Aggregate hours by time slot
export function analyzeTimeOfDay(data) {
  const result = { Morning: 0, Afternoon: 0, Evening: 0, Night: 0 };
  data.forEach((entry) => {
    const slot = getTimeOfDayLabel(entry.startTime);
    result[slot] += entry.hours;
  });
  return result;
}
