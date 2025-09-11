// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const getTodayHours = () => {
    const today = new Date().toISOString().split("T")[0];
    return data
      .filter((entry) => entry.date === today)
      .reduce((sum, entry) => sum + entry.hours, 0);
  };

  const getWeeklyHours = () => {
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

  const getMonthlyHours = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    return data
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getMonth() === month && entryDate.getFullYear() === year
        );
      })
      .reduce((sum, entry) => sum + entry.hours, 0);
  };

  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="dashboard">
      <h1>Study Tracker Dashboard</h1>
      <h3>Student: Sakshi Yadav</h3>

      <div className="section">
        <h2>Today’s Hours</h2>
        <p>{getTodayHours()} hours</p>
      </div>

      <div className="section">
        <h2>Weekly Total (Last 7 Days)</h2>
        <p>{getWeeklyHours()} hours</p>
      </div>

      <div className="section">
        <h2>{currentMonthName} Total</h2>
        <p>{getMonthlyHours()} hours</p>
      </div>
    </div>
  );
};

export default Dashboard;
