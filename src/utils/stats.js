// src/utils/stats.js

// Today hours
export const getTodayHours = (data) => {
  const today = new Date().toISOString().split("T")[0];
  return data
    .filter((entry) => entry.date === today)
    .reduce((sum, entry) => sum + entry.hours, 0);
};

// Weekly hours (last 7 days)
export const getWeeklyHours = (data) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);
  return data
    .filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= sevenDaysAgo && entryDate <= today;
    })
    .reduce((sum, entry) => sum + entry.hours, 0);
};

// Monthly hours (current month)
export const getMonthlyHours = (data) => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  return data
    .filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === month && entryDate.getFullYear() === year;
    })
    .reduce((sum, entry) => sum + entry.hours, 0);
};

// Average Daily Hours (current month)
export const calculateAverageDailyHours = (data) => {
  const today = new Date();
  const currentMonthData = data.filter(
    (entry) =>
      new Date(entry.date).getMonth() === today.getMonth() &&
      new Date(entry.date).getFullYear() === today.getFullYear()
  );

  const aggregatedByDate = currentMonthData.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + curr.hours;
    return acc;
  }, {});

  const totalHours = Object.values(aggregatedByDate).reduce(
    (sum, h) => sum + h,
    0
  );
  const numOfDays = Object.keys(aggregatedByDate).length;
  return numOfDays ? (totalHours / numOfDays).toFixed(2) : 0;
};

// Longest Study Streak
export const calculateLongestStreak = (data) => {
  const sortedDates = [...new Set(data.map((e) => e.date))].sort(
    (a, b) => new Date(a) - new Date(b)
  );
  let maxStreak = 0;
  let currentStreak = 0;
  let prevDate = null;

  sortedDates.forEach((dateStr) => {
    const d = new Date(dateStr);
    if (prevDate) {
      const diffDays = (d - prevDate) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }
    if (currentStreak > maxStreak) maxStreak = currentStreak;
    prevDate = d;
  });

  return maxStreak;
};

// src/utils/stats.js

// Returns the date with max hours in the given data
export const getBestDay = (data) => {
  if (!data.length) return null;

  // Aggregate hours by date
  const hoursByDate = data.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + curr.hours;
    return acc;
  }, {});

  // Find the date with max hours
  let bestDay = null;
  let maxHours = 0;

  Object.entries(hoursByDate).forEach(([date, hours]) => {
    if (hours > maxHours) {
      maxHours = hours;
      bestDay = date;
    }
  });

  return { date: bestDay, hours: maxHours };
};
