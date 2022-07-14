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
        <TabContext
          value={selectedRun.toLowerCase()}
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
        </TabContext>
      </div>
    )
  );
};

const SingleRun = ({ run }) => {
  return (
    <div className="single-run-history">
      Date: {run.startTime}
      <ul>
        <li>Time: {run.time}</li>
        <li>Distance: {run.distance}</li>
        <li>comment: {run.comment}</li>
        {/* <img src={run.image} alt="" /> */}
      </ul>
    </div>
  );
};
