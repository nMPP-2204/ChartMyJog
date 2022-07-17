import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { getUserRuns } from "../utils/firestore";
import SingleRun from "./SingleRun";
import NoRuns from "./NoRuns";

export const PreviousRuns = () => {
  const [runs, setRuns] = useState([]);
  const [user] = useAuthState(auth);
  const [selectedRun, setSelectedRun] = useState(null);

  useEffect(() => {
    if (user) {
      (async () => {
        setRuns(await getUserRuns(user));
      })();
    }
  }, []);

  if (!runs || !runs.length) {
    return <NoRuns />;
  }

  if (!selectedRun && runs.length > 0) setSelectedRun(runs[0].startTime);
  return (
    !selectedRun || (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "helvetica",
            marginTop: "50px",
          }}
        >
          <h2>Your last run(s)</h2>
        </div>
        <div>
          {runs.map((run) => (
            <SingleRun key={run.startTime} run={run} />
          ))}
        </div>
      </div>
    )
  );
};
