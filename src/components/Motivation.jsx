import React, { useEffect, useState } from "react";

const messages = [
  "Keep going! Every hour counts.",
  "Consistency is the key to success.",
  "You're doing amazing, keep studying!",
  "Small steps lead to big results.",
  "Believe in yourself and stay focused.",
];

const Motivation = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const random = messages[Math.floor(Math.random() * messages.length)];
    setMsg(random);
  }, []);

  return (
    <div className="motivation">
      <em>{msg}</em>
    </div>
  );
};

export default Motivation;
