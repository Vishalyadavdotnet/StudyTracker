// src/utils/chartData.js

export const getChartData = (data, startDate, endDate) => {
  let filteredData;

  if (!startDate && !endDate) {
    // Default: current month
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    filteredData = data.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === month && entryDate.getFullYear() === year;
    });
  } else {
    // Apply start/end date filter
    filteredData = data.filter((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);

      const sDate = startDate ? new Date(startDate) : null;
      const eDate = endDate ? new Date(endDate) : null;
      if (sDate) sDate.setHours(0, 0, 0, 0);
      if (eDate) eDate.setHours(0, 0, 0, 0);

      if (sDate && eDate) return entryDate >= sDate && entryDate <= eDate;
      if (sDate) return entryDate >= sDate;
      if (eDate) return entryDate <= eDate;
      return true;
    });
  }

  // Aggregate hours per date
  const aggregatedData = filteredData.reduce((acc, curr) => {
    const existing = acc.find((item) => item.date === curr.date);
    if (existing) {
      existing.hours += curr.hours;
    } else {
      acc.push({ date: curr.date, hours: curr.hours });
    }
    return acc;
  }, []);

  // Sort by date
  return aggregatedData
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((entry) => ({ date: entry.date, hours: entry.hours }));
};
