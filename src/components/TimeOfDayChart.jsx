import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#FFA500", "#00BFFF", "#FF69B4", "#8A2BE2"]; // Gen Z friendly

const TimeOfDayChart = ({ data }) => {
  // Convert object to array for Recharts
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    hours: value,
  }));

  return (
    <div className="section">
      <h2>Time of Day Analysis</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="hours"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeOfDayChart;
