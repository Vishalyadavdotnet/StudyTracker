// src/utils/subjectData.js

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

  return filteredData.reduce((acc, curr) => {
    acc[curr.subject] = (acc[curr.subject] || 0) + curr.hours;
    return acc;
  }, {});
};
