// src/utils/subjectAnalytics.js

export const getSubjectTotals = (data, startDate, endDate) => {
  let filteredData = data;

  if (startDate || endDate) {
    const sDate = startDate ? new Date(startDate) : null;
    const eDate = endDate ? new Date(endDate) : null;
    if (sDate) sDate.setHours(0, 0, 0, 0);
    if (eDate) eDate.setHours(0, 0, 0, 0);

    filteredData = data.filter((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);

      if (sDate && eDate) return entryDate >= sDate && entryDate <= eDate;
      if (sDate) return entryDate >= sDate;
      if (eDate) return entryDate <= eDate;
      return true;
    });
  }

  const totals = filteredData.reduce((acc, curr) => {
    acc[curr.subject] = (acc[curr.subject] || 0) + curr.hours;
    return acc;
  }, {});

  return totals;
};

export const getAverageDailyHoursPerSubject = (data, startDate, endDate) => {
  const totals = getSubjectTotals(data, startDate, endDate);

  // Count unique study days per subject
  const daysPerSubject = {};
  data.forEach((entry) => {
    const entryDate = new Date(entry.date).toISOString().split("T")[0];
    if (startDate && new Date(entry.date) < new Date(startDate)) return;
    if (endDate && new Date(entry.date) > new Date(endDate)) return;

    if (!daysPerSubject[entry.subject])
      daysPerSubject[entry.subject] = new Set();
    daysPerSubject[entry.subject].add(entryDate);
  });

  const avg = {};
  Object.keys(totals).forEach((sub) => {
    const uniqueDays = daysPerSubject[sub] ? daysPerSubject[sub].size : 1;
    avg[sub] = +(totals[sub] / uniqueDays).toFixed(2);
  });

  return avg;
};

export const getLongestStreakPerSubject = (data) => {
  const streaks = {};

  // Group entries by subject and sort by date
  const subjectDates = {};
  data.forEach((entry) => {
    if (!subjectDates[entry.subject]) subjectDates[entry.subject] = new Set();
    subjectDates[entry.subject].add(entry.date);
  });

  Object.keys(subjectDates).forEach((subject) => {
    const dates = Array.from(subjectDates[subject]).sort();
    let maxStreak = 0;
    let currentStreak = 1;

    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diff = (curr - prev) / (1000 * 60 * 60 * 24);

      if (diff === 1) currentStreak++;
      else currentStreak = 1;

      if (currentStreak > maxStreak) maxStreak = currentStreak;
    }
    streaks[subject] = maxStreak;
  });

  return streaks;
};

// Top N subjects by total hours
export const getTopSubjects = (data, topN = 3) => {
  const totals = getSubjectTotals(data);
  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([subject, hours]) => ({ subject, hours }));
};
