import React from "react";
import { calculateLongestStreak, getMonthlyHours } from "../utils/stats";

const badgesList = [
  {
    title: "100h Total",
    condition: (data) => data.reduce((sum, e) => sum + e.hours, 0) >= 100,
  },
  {
    title: "30 Days Streak",
    condition: (data) => calculateLongestStreak(data) >= 30,
  },
];

const Badges = ({ data }) => {
  const unlocked = badgesList.filter((b) => b.condition(data));
  if (unlocked.length === 0) return <p>No badges unlocked yet!</p>;
  return (
    <div className="badges-container">
      {unlocked.map((b) => (
        <div key={b.title} className="badge">
          {b.title}
        </div>
      ))}
    </div>
  );
};

export default Badges;
