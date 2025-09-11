import React, { useMemo } from "react";
import "../styles/CoinsSystem.css"; // 👈 add css import

const CoinsSystem = ({ data }) => {
  const currentMonth = new Date().getMonth();

  const monthlyHours = useMemo(
    () =>
      data
        .filter((e) => new Date(e.date).getMonth() === currentMonth)
        .reduce((sum, e) => sum + e.hours, 0),
    [data]
  );

  const monthlyCoins = monthlyHours * 5;
  const target = 1000;
  const progress = Math.min((monthlyCoins / target) * 100, 100);

  return (
    <div className="coins-card">
      <h2 className="coins-title">💰 Coins System</h2>
      <p className="coins-subtitle">1 hour = ₹5 | Target = ₹1000 per month</p>

      {/* progress bar */}
      <div className="coins-progress">
        <div
          className="coins-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="coins-amount">
        This Month:{" "}
        <span className="coins-value">₹{monthlyCoins.toFixed(1)}</span> / ₹
        {target}
      </p>

      {monthlyCoins >= target ? (
        <p className="coins-success">
          🎉 Congrats! ₹1000 milestone achieved! Reset next month.
        </p>
      ) : (
        <p className="coins-hint">
          Keep going! Only ₹{(target - monthlyCoins).toFixed(1)} left.
        </p>
      )}
    </div>
  );
};

export default CoinsSystem;
