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
  }, [user]);

  if (!runs || !runs.length) {
    return <NoRuns />;
  }

  if (!selectedRun && runs.length > 0) setSelectedRun(runs[0].startTime);
  return (
    <>
      {!selectedRun || (
        <div>
          <div className="text-2xl mt-12 font-semibold text-center">
            <h2>Your last run(s)</h2>
          </div>
          <div className="flex flex-wrap justify-center">
            {runs.map((run) => (
              <SingleRun key={run.startTime} run={run} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
