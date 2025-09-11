// src/utils/trendAnalytics.js

// Helper: get start and end dates of the last n days
const getLastNDays = (n) => {
  const today = new Date();
  const result = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    result.push(d.toISOString().split("T")[0]);
  }
  return result;
};

// Weekly trend (last week vs this week)
export const getWeeklyTrend = (data) => {
  const today = new Date();

  const thisWeekDates = [];
  const lastWeekDates = [];

  // Calculate current week (Mon-Sun)
  const day = today.getDay(); // 0=Sun, 1=Mon ...
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    thisWeekDates.push(d.toISOString().split("T")[0]);
  }

  const lastWeekMonday = new Date(monday);
  lastWeekMonday.setDate(monday.getDate() - 7);
  for (let i = 0; i < 7; i++) {
    const d = new Date(lastWeekMonday);
    d.setDate(lastWeekMonday.getDate() + i);
    lastWeekDates.push(d.toISOString().split("T")[0]);
  }

  const getHours = (dates) =>
    dates.map((date) => {
      const total = data
        .filter((entry) => entry.date === date)
        .reduce((sum, e) => sum + e.hours, 0);
      return { date, hours: total };
    });

  return {
    thisWeek: getHours(thisWeekDates),
    lastWeek: getHours(lastWeekDates),
  };
};

// Monthly trend (last month vs this month)
export const getMonthlyTrend = (data) => {
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();
  const lastMonthDate = new Date(today);
  lastMonthDate.setMonth(today.getMonth() - 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastYear = lastMonthDate.getFullYear();

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getMonthData = (year, month) => {
    const totalDays = daysInMonth(year, month);
    const result = [];
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = new Date(year, month, day).toISOString().split("T")[0];
      const total = data
        .filter((entry) => entry.date === dateStr)
        .reduce((sum, e) => sum + e.hours, 0);
      result.push({ date: dateStr, hours: total });
    }
    return result;
  };

  return {
    thisMonth: getMonthData(thisYear, thisMonth),
    lastMonth: getMonthData(lastYear, lastMonth),
  };
};
