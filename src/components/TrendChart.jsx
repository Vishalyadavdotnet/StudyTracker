// src/components/TrendChart.jsx
import React from "react";
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
  return (
    <div className="section">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            data={data1}
            dataKey="hours"
            stroke="#8884d8"
            name={label1}
          />
          <Line
            type="monotone"
            data={data2}
            dataKey="hours"
            stroke="#82ca9d"
            name={label2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
