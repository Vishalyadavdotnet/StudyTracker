import React, { useState, useEffect } from "react";
import "../styles/theme.css";

const themes = [
  { id: "light", label: "🌞 Light" },
  { id: "dark", label: "🌙 Dark" },
  { id: "pink", label: "🌸 Pink" },
  { id: "mint", label: "🌱 Mint" },
  { id: "purple", label: "💜 Purple" },
  { id: "sunset", label: "🌇 Sunset" },
];

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "8px",
          border: "1px solid var(--accent-color)",
          background: "var(--card-bg)",
          color: "var(--text-color)",
        }}
      >
        {themes.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeToggle;
