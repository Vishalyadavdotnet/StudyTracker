import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const StudyChart = ({ data }) => {
  const weeklyAvg = 4; // set weekly average here

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, Math.max(weeklyAvg, ...data.map((d) => d.hours))]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="hours"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <ReferenceLine
          y={weeklyAvg}
          label={`Avg ${weeklyAvg}h`}
          stroke="red"
          strokeDasharray="3 3"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StudyChart;
