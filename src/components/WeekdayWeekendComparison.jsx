import React from "react";
import { getWeekdayWeekend } from "../utils/analytics";

const WeekdayWeekendComparison = ({ data }) => {
  const { weekdayHours, weekendHours } = getWeekdayWeekend(data);
  const maxHours = Math.max(weekdayHours, weekendHours);

  const getIntensity = (hours) => 0.2 + (hours / maxHours) * 0.8;

  return (
    <div className="heatmap-container">
      <div
        className="heatmap-cell"
        style={{
          backgroundColor: `rgba(72,61,139,${getIntensity(weekdayHours)})`,
        }}
        title={`Weekdays: ${weekdayHours}h`}
      >
        Weekdays
        <br />
        {weekdayHours}h
      </div>
      <div
        className="heatmap-cell"
        style={{
          backgroundColor: `rgba(30,144,255,${getIntensity(weekendHours)})`,
        }}
        title={`Weekend: ${weekendHours}h`}
      >
        Weekend
        <br />
        {weekendHours}h
      </div>
    </div>
  );
};

export default WeekdayWeekendComparison;
