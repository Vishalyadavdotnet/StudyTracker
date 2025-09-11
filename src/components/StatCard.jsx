// src/components/StatCard.jsx
import React from "react";

const StatCard = ({ title, value }) => (
  <div className="section">
    <h2>{title}</h2>
    <p>{value}</p>
  </div>
);

export default StatCard;
