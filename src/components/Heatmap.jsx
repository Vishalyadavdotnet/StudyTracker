import React from "react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Heatmap = ({ data, startDate, endDate }) => {
  const counts = weekdays.reduce((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {});

  data.forEach((entry) => {
    const d = new Date(entry.date);
    if (startDate && new Date(entry.date) < new Date(startDate)) return;
    if (endDate && new Date(entry.date) > new Date(endDate)) return;
    counts[weekdays[d.getDay()]] += entry.hours;
  });

  return (
    <div className="heatmap-container">
      {weekdays.map((day) => (
        <div
          key={day}
          className="heatmap-cell"
          style={{
            backgroundColor: `rgba(136,132,216, ${Math.min(
              counts[day] / 4,
              1
            )})`,
          }}
        >
          <strong>{day}</strong>
          <br />
          {counts[day]}h
        </div>
      ))}
    </div>
  );
};

export default Heatmap;
