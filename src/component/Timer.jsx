import React, { useState, useEffect } from "react";

let tID = null;

export default function Timer({ start }) {
  // const [ tID, setTID ] = useState(null);
  const [ms, setMs] = useState(0);

  if (!tID && start) {
    tID = setInterval(() => {
      setMs((ms) => {
        return ++ms;
      });
    }, 1);
  }

  if (!start && tID) {
    clearInterval(tID);
    tID = null;
  }

  return <div>Timer: {ms}</div>;
}


