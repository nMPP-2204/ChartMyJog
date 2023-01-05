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
        className={buttonStyle}
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
const buttonStyle = [
  "w-56 h-16 mx-4 mt-4 hover:w-64 hover:h-20",
  "flex flex-nowrap items-center justify-center",
  `rounded-full bg-sky-700 hover:bg-sky-800`,
  "text-2xl text-black hover:text-4xl",
].join(" ");

export default TestRun;
