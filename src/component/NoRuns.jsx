import React from "react";
import { Link } from "react-router-dom";

const NoRuns = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontFamily: "helvetica",
        marginTop: "50px",
      }}
    >
      <h2>
        You don't have any runs...
        <br />
        <br />
        <Link to="/run-tracker">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                borderRadius: "25px",
                backgroundColor: "#e4e0d9",
                padding: "5px",
              }}
            >
              GET STARTED NOW!
            </button>
          </div>
        </Link>
      </h2>
    </div>
  );
};

export default NoRuns;
