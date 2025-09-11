// src/components/DateFilter.jsx
import React from "react";

const DateFilter = ({ startDate, endDate, setStartDate, setEndDate }) => (
  <div className="filter-container">
    <label>
      Start Date:
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
    </label>
    <label>
      End Date:
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </label>
  </div>
);

export default DateFilter;
