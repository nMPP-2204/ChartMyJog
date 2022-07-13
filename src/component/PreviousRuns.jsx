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

        {/* <TabContext
          value={selectedRun}
          className="previous-run-list"
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(e) => {
                setSelectedRun(e.target.innerText);
              }}
              aria-label="lab API tabs example"
              orientation="vertical"
            >
              {runs.map((run) => (
                <Tab
                  key={run.id}
                  label={run.startTime}
                  value={run.startTime.toLowerCase()}
                />
              ))}
            </TabList>
          </Box>
          {runs.map((run) => (
            <TabPanel key={run.id} value={run.startTime.toLowerCase()}>
              <SingleRun run={run} />
            </TabPanel>
          ))}
        </TabContext> */}
      </div>
    )
  );
};

const SingleRun = ({ run }) => {
  console.log('server timestamp: ',run.startTime.toDate())
  const startTime = run.startTime.toDate().toString()

  return (
    <div className="single-run-history">
      Date: {startTime.slice(0, startTime.indexOf("("))}
      <ul>
        <li>Time: {run.time}</li>
        <li>Distance: {run.distance}</li>
        <li>comment: {run.comment}</li>
      </ul>
    <div className="img">
      <img src="https://i.insider.com/5d484d1836e03c058747af94?width=1300&format=jpeg&auto=webp" alt='' />
    </div>
    </div>
  );
};
