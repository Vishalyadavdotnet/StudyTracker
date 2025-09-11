// src/components/TrendChart.jsx
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TrendChart = ({ data1, data2, label1, label2, title }) => {
  // Merge data1 and data2 by date
  const mergedData = useMemo(() => {
    const maxLength = Math.max(data1.length, data2.length);
    const result = [];
    for (let i = 0; i < maxLength; i++) {
      const d1 = data1[i] || { date: data2[i]?.date || "", hours: 0 };
      const d2 = data2[i] || { date: data1[i]?.date || "", hours: 0 };
      result.push({
        date: d1.date,
        [label1]: d1.hours,
        [label2]: d2.hours,
      });
    }
    return result;
  }, [data1, data2, label1, label2]);

  return (
    <div className="section">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={mergedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={label1} stroke="#8884d8" />
          <Line type="monotone" dataKey={label2} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
