import React, { useState } from "react";
import geoLocation from "../Hooks/useGeoLocation";

let tID = null;

export default function Timer({
  start,
  setStart,
  distance,
  setDistance,
  setPolyLine,
}) {

  const [ms, setMs] = useState(0);

  if (!tID && start) {
    tID = setInterval(() => {
      setMs((ms) => {
        return ms + 10;
      });
    }, 10);
  }

  if (!start && tID) {
    clearInterval(tID);
    tID = null;
  }

  return (
    <div className="trackContainer">
      <div className="distanceTimer">
        <div className="distance">
          <div style={{marginLeft: "30px"}}>
            <span className="hrMin">{distance.toFixed(2)}</span>
          </div>
          <div style={{fontSize: "12px", marginLeft: "32px"}}>
            DISTANCE(MI)
          </div>
        </div>
        <div className="timer">
          <div>
            <span className="hrMin">
              {("0" + Math.floor((ms / 60000) % 60)).slice(-2)}:
            </span>

            <span className="hrMin">
              {("0" + Math.floor((ms / 1000) % 60)).slice(-2)}:
            </span>
            <span className="ms">{("0" + ((ms / 10) % 100)).slice(-2)}</span>
          </div >
          <div style={{fontSize: "12px"}}>
          DURATION
          </div>
        </div>
      </div>
      <div className="tracker">
        <label className="switch">
          <input
            type="checkbox"
            onClick={() => {
              setStart(!start);
              geoLocation(setPolyLine, setDistance);
            }}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}
