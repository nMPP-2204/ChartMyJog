import React from "react";
import testGeolocation from "../Hooks/testGeolocation";


const TestRun = ({
  setStart,
  setPolyLine,
  setDistance,
  setLocation,
  location,
  start,
  setMs,
}) => {
  return (
    !start && (
      <button
        className="startRun"
        onClick={() => {
          testGeolocation(
            setPolyLine,
            setDistance,
            setLocation,
            location,
            setStart,
            setMs
          );
          setStart(true);
        }}
      >
        Test Run
      </button>
    )
  );
};
export default TestRun;
