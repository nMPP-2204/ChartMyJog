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
  saveRun,
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
            setMs,
            saveRun
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
  "w-56 h-16 mx-4 transition-all ease-in-out duration-500 hover:scale-110",
  "flex flex-nowrap items-center justify-center",
  `rounded-lg bg-black`,
  "text-2xl text-white",
].join(" ");

export default TestRun;
