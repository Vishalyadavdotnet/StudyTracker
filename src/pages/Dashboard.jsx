// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "../styles/Chart.css";
import "../styles/Heatmap.css";

import StudyChart from "../components/StudyChart";
import StatCard from "../components/StatCard";
import DateFilter from "../components/DateFilter";
import SubjectPieChart from "../components/SubjectPieChart";
import { getSubjectTotals } from "../utils/subjectData";
import { getChartData } from "../utils/chartData";
import {
  getAverageDailyHoursPerSubject,
  getLongestStreakPerSubject,
  getTopSubjects,
} from "../utils/subjectAnalytics";

import Heatmap from "../components/Heatmap";
import Badges from "../components/Badges";
import Motivation from "../components/Motivation";

import {
  getTodayHours,
  getWeeklyHours,
  getMonthlyHours,
  calculateAverageDailyHours,
  calculateLongestStreak,
  getBestDay,
} from "../utils/stats";

import { getWeeklyTrend, getMonthlyTrend } from "../utils/trendAnalytics";
import TrendChart from "../components/TrendChart";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const chartData = getChartData(data, startDate, endDate);
  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });

  // inside Dashboard component
  const subjectTotals = getSubjectTotals(data, startDate, endDate);

  const avgDailyPerSubject = getAverageDailyHoursPerSubject(
    data,
    startDate,
    endDate
  );
  const streakPerSubject = getLongestStreakPerSubject(data);
  const topSubjects = getTopSubjects(data, 3);

  const weeklyTrend = getWeeklyTrend(data);
  const monthlyTrend = getMonthlyTrend(data);
  const bestDay = getBestDay(data, startDate, endDate);

  return (
    <div className="dashboard">
      <h1>Study Tracker Dashboard</h1>
      <h3>Student: Sakshi Yadav</h3>

      {/* Stat Cards */}
      <StatCard title="Today’s Hours" value={`${getTodayHours(data)} hours`} />
      <StatCard
        title="Weekly Total (Last 7 Days)"
        value={`${getWeeklyHours(data)} hours`}
      />
      <StatCard
        title={`${currentMonthName} Total`}
        value={`${getMonthlyHours(data)} hours`}
      />
      <StatCard
        title="Average Daily Hours (This Month)"
        value={`${calculateAverageDailyHours(data)} hours`}
      />
      <StatCard
        title="Longest Study Streak"
        value={`${calculateLongestStreak(data)} days`}
      />
      {bestDay && (
        <StatCard
          title="Best Day"
          value={`${bestDay.date}: ${bestDay.hours}h`}
        />
      )}

      {/* Advanced Analytics per Subject */}
      <div className="section">
        <h2>Average Daily Hours (Per Subject)</h2>
        {Object.entries(avgDailyPerSubject).map(([sub, hours]) => (
          <p key={sub}>
            {sub}: {hours}h/day
          </p>
        ))}
      </div>

      <div className="section">
        <h2>Longest Streak (Per Subject)</h2>
        {Object.entries(streakPerSubject).map(([sub, days]) => (
          <p key={sub}>
            {sub}: {days} days
          </p>
        ))}
      </div>

      <div className="section">
        <h2>Top 3 Subjects</h2>
        {topSubjects.map((item) => (
          <p key={item.subject}>
            {item.subject}: {item.hours}h
          </p>
        ))}
      </div>

      {/* Weekly Trend */}
      <TrendChart
        title="Weekly Trend Comparison"
        data1={weeklyTrend.lastWeek}
        data2={weeklyTrend.thisWeek}
        label1="Last Week"
        label2="This Week"
      />

      {/* Monthly Trend */}
      <TrendChart
        title="Monthly Trend Comparison"
        data1={monthlyTrend.lastMonth}
        data2={monthlyTrend.thisMonth}
        label1="Last Month"
        label2="This Month"
      />

      {/* Date Filter */}
      <DateFilter
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {/* Charts */}
      <StudyChart data={chartData} />

      {/* Subject-wise Pie Chart */}
      <h2>Subject-wise Hours</h2>
      <SubjectPieChart data={subjectTotals} />

      {/* Heatmap */}
      <h2>Weekday Pattern</h2>
      <Heatmap data={data} startDate={startDate} endDate={endDate} />

      {/* Badges */}
      <h2>Unlocked Badges</h2>
      <Badges data={data} />

      {/* Motivation */}
      <Motivation />
    </div>
  );
};

export default Dashboard;
