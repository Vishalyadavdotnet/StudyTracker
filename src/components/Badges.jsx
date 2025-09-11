import React from "react";

// Hours thresholds for ranks
const badgeTiers = [
  { name: "Bronze", color: "🟤", thresholds: [10, 20, 30, 40, 50] },
  { name: "Silver", color: "⚪", thresholds: [75, 100, 125, 150, 200] },
  { name: "Gold", color: "🟡", thresholds: [250, 300, 350, 400, 500] },
  { name: "Platinum", color: "🔵", thresholds: [600, 700, 800, 900, 1000] },
  { name: "Diamond", color: "💎", thresholds: [1200, 1400, 1600, 1800, 2000] },
];

// const badgeTiers = [
//   {
//     name: "Bronze",
//     logo: "/assets/badges/bronze.png",
//     thresholds: [10, 20, 30, 40, 50],
//   },
//   {
//     name: "Silver",
//     logo: "/assets/badges/silver.png",
//     thresholds: [75, 100, 125, 150, 200],
//   },
//   {
//     name: "Gold",
//     logo: "/assets/badges/gold.png",
//     thresholds: [250, 300, 350, 400, 500],
//   },
//   {
//     name: "Platinum",
//     logo: "/assets/badges/platinum.png",
//     thresholds: [600, 700, 800, 900, 1000],
//   },
//   {
//     name: "Diamond",
//     logo: "/assets/badges/diamond.png",
//     thresholds: [1200, 1400, 1600, 1800, 2000],
//   },
// ];


// Function to get current badge
function getBadge(hours) {
  for (let i = badgeTiers.length - 1; i >= 0; i--) {
    const tier = badgeTiers[i];
    for (let j = tier.thresholds.length - 1; j >= 0; j--) {
      if (hours >= tier.thresholds[j]) {
        const level = 5 - j; // V → I
        return {
          name: `${tier.name} ${["V", "IV", "III", "II", "I"][j]}`,
          logo: tier.color,
        };
      }
    }
  }
  return null;
}

const Badges = ({ data }) => {
  const totalHours = data.reduce((sum, e) => sum + e.hours, 0);
  const currentBadge = getBadge(totalHours);

  if (!currentBadge) return <p>No badge unlocked yet!</p>;

  return (
    <div className="badge">
      <span className="logo" style={{ fontSize: "2rem" }}>
        {currentBadge.logo}
      </span>
      <p>{currentBadge.name}</p>
      <small>{totalHours}h</small>
    </div>
  );
};

export default Badges;
