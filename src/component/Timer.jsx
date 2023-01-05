import React, { useState } from "react";
import geoLocation from "../Hooks/useGeoLocation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import { createRun } from "../utils/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import domtoimage from "dom-to-image";
import TestRun from "./TestRun";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 315,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "28px",
};

let tID = null;

export default function Timer({
  start,
  setStart,
  distance,
  setDistance,
  setPolyLine,
  setLocation,
  location,
}) {
  const [user] = useAuthState(auth);
  const [ms, setMs] = useState(0);
  const [open, setOpen] = useState(false);
  const [pause, setPause] = useState(false);
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");

  const hr = JSON.stringify(Math.floor((ms / 3600000) % 60));
  const min = ("0" + Math.floor((ms / 60000) % 60)).slice(-2);
  const sec = ("0" + Math.floor((ms / 1000) % 60)).slice(-2);

  const handleClose = () => setOpen(false);

  const handleOpen = () => {
    geoLocation(setPolyLine, setDistance);
    setOpen(true);
  };

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

  async function saveRun() {
    const node = document.getElementById("MapImage");
    const dataUrl = await domtoimage.toSvg(node);

    let pace = 0;
    if (distance) {
      const totalSec = +hr * 3600 + +min * 60 + +sec;
      pace = Math.ceil((totalSec / 60 / distance) * 100) / 100;
    }
    createRun({
      distance: distance,
      time: `${hr}:${min}:${sec}`,
      uid: user.uid,
      image: dataUrl,
      name: input,
      comment: value,
      pace,
    });

    setValue("");
    setInput("");
    setPolyLine([]);
  }

  const buttons = {
    start: {
      onClick: () => {
        setStart(true);
        geoLocation(setPolyLine, setDistance);
      },
      color: "bg-green-500",
      hoverColor: "bg-lime-500",
    },
    pause: {
      onClick: () => {
        setPause(true);
        setStart(false);
      },
      color: "bg-amber-300",
      hoverColor: "bg-yellow-500",
    },
    end: {
      onClick: () => {
        setPause(false);
        setStart(false);
        clearInterval(tID);
        tID = null;

        handleOpen();
      },
      color: "bg-red-500",
      hoverColor: "bg-red-600",
    },
    resume: {
      onClick: () => {
        setPause(false);
        setStart(true);
      },
      color: "bg-cyan-500",
      hoverColor: "bg-cyan-700",
    },
    reset: {
      onClick: () => {
        setMs(0);
        setDistance(0);
        setPause(false);
      },
      color: "bg-red-500",
      hoverColor: "bg-red-600",
    },
  };

  return (
    <div>
      <div className="trackContainer text-black">
        <div className="distanceTimer">
          <div className="distance text-2xl m-4">
            <div>
              DISTANCE (MI) -{" "}
              <span className="text-3xl">{distance.toFixed(2)}</span>
            </div>
          </div>
          <div className="timer">
            <div>
              <div className="text-2xl">
                DURATION - <span className="text-3xl">{hr}:</span>
                <span className="text-3xl">{min}:</span>
                <span className="text-3xl">{sec}:</span>
                <span className="ms">
                  {("0" + ((ms / 10) % 100)).slice(-2)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="tracker">
          {!start && ms === 0 && (
            <div className="tracker">
              <WrapperBtn {...buttons["start"]}>Start</WrapperBtn>
            </div>
          )}
          {start && (
            <>
              <div className="flex">
                <WrapperBtn {...buttons["pause"]}>Pause</WrapperBtn>
                <WrapperBtn {...buttons["end"]}>End</WrapperBtn>
              </div>
            </>
          )}
          {pause && (
            <>
              <WrapperBtn {...buttons["resume"]}>Resume</WrapperBtn>
              <WrapperBtn {...buttons["reset"]}>Reset</WrapperBtn>
            </>
          )}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modalComponents">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="modalTimeDistance">
                  <div style={{ fontSize: "16px" }}>
                    DISTANCE(MI): {distance.toFixed(2)}
                  </div>
                  <div style={{ fontSize: "16px" }}>
                    DURATION: {`${hr}:${min}:${sec}`}
                  </div>
                  <div style={{ fontSize: "16px" }}>
                    {/* AVG PACE: {(distance / ms).toFixed(2)} */}
                  </div>
                </div>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                NAME YOUR RUN:
              </Typography>
              <Input value={input} onChange={(e) => setInput(e.target.value)} />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                COMMENTS:
              </Typography>
              <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <br />
              <Button
                className="startRun"
                onClick={() => {
                  setMs(0);
                  setDistance(0);
                  setPause(false);
                  handleClose();
                  saveRun();
                }}
              >
                SAVE RUN
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="tracker">
        {start === false && pause === false && (
          <TestRun
            setStart={setStart}
            setPolyLine={setPolyLine}
            setDistance={setDistance}
            setLocation={setLocation}
            location={location}
            start={start}
            setMs={setMs}
          />
        )}
      </div>
    </div>
  );
}

const WrapperBtn = ({ children, onClick, color, hoverColor }) => {
  const buttonStyle = [
    "w-56 h-16 mx-4 hover:w-64 hover:h-20",
    "flex flex-nowrap items-center justify-center",
    `rounded-full ${color} hover:${hoverColor}`,
    "text-2xl text-black hover:text-4xl",
  ].join(" ");

  return (
    <button className={"startRun " + buttonStyle} onClick={onClick}>
      <p>{children}</p>
    </button>
  );
};
