import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { getUserRuns } from "../utils/firestore";
import { Box, Tabs, Tab } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";

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
    return <div>No Runs</div>;
  }
  if (!selectedRun && runs.length > 0) setSelectedRun(runs[0].startTime);
  return (
    !selectedRun || (
      <div>
        <h1>Your last run(s)</h1>
        <div>
          {runs.map((run) => (
            <SingleRun key={run.startTime} run={run} />
          ))}
        </div>
      </div>
    )
  );
};

const SingleRun = ({ run }) => {
  const startTime = run.startTime.toDate().toString();
  console.log(run);
  return (
    <div className="single-run-history">
      Date: {startTime.slice(0, startTime.indexOf("("))}
      <ul>
        <li>Time: {run.time}</li>
        <li>Distance: {run.distance}</li>
        <li>comment: {run.comment}</li>
      </ul>
      <div className="img">
        {/* <img
          src="https://i.insider.com/5d484d1836e03c058747af94?width=1300&format=jpeg&auto=webp"
          alt=""
        /> */}
        <img src={run.imgURL} alt="your run" />
      </div>
    </div>
  );
};
