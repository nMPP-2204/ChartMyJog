import React, { useState } from "react";
import geoLocation from "../Hooks/useGeoLocation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

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

export default function Timer({
  start,
  setStart,
  distance,
  setDistance,
  setPolyLine,
  setLocation,
  location,
  saveRun,
  setPause,
  pause,
  ms,
  clearTimer,
}) {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");

  const handleClose = () => setOpen(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const buttons = {
    start: {
      onClick: () => {
        setStart(true);
      },
      color: "bg-black",
      textColor: "text-white",
    },
    pause: {
      onClick: () => {
        setPause(true);
      },
      // color: "bg-amber-300",
      // hoverColor: "bg-yellow-500",
      color: "bg-black",
      textColor: "text-white",
    },
    end: {
      onClick: () => {
        clearTimer();
        geoLocation(setPolyLine, setDistance, false);
        handleOpen();
      },
      // color: "bg-red-500",
      // hoverColor: "bg-red-600",
      color: "bg-black",
      textColor: "text-white",
    },
    resume: {
      onClick: () => {
        setPause(false);
      },
      // color: "bg-cyan-500",
      // hoverColor: "bg-cyan-700",
      color: "bg-black",
      textColor: "text-white",
    },
    reset: {
      onClick: () => {
        setStart(false);
        setPause(false);
      },
      // color: "bg-red-500",
      // hoverColor: "bg-red-600",
      color: "bg-black",
      textColor: "text-white",
    },
  };

  const hr = JSON.stringify(Math.floor((ms / 3600000) % 60));
  const min = ("0" + Math.floor((ms / 60000) % 60)).slice(-2);
  const sec = ("0" + Math.floor((ms / 1000) % 60)).slice(-2);

  return (
    <div className="absolute bottom-0 flex flex-col flex-wrap justify-between w-screen pb-8 text-black bg-transparent md:pt-20 pt-14">
      <div className="flex flex-wrap items-center w-full justify-evenly">
        {!start && <WrapperBtn {...buttons["start"]}>Start</WrapperBtn>}
        {/* {start === false && pause === false && (
            <TestRun
              setStart={setStart}
              setPolyLine={setPolyLine}
              setDistance={setDistance}
              setLocation={setLocation}
              location={location}
              start={start}
              setMs={setMs}
              saveRun={saveRun}
            />
          )} */}
        {start && !pause && (
          <>
            <WrapperBtn {...buttons["pause"]}>Pause</WrapperBtn>
            <WrapperBtn {...buttons["end"]}>End</WrapperBtn>
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
                  DISTANCE (MI): {distance.toFixed(2)}
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
                saveRun({ user, input, value, setValue, setInput });
                setStart(false);
                setPause(false);
                handleClose();
              }}
            >
              SAVE RUN
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const WrapperBtn = ({ children, onClick, color, textColor }) => {
  return (
    <button
      className={`startRun btn-secondary shadow-black shadow-xl ${color} ${textColor}`}
      onClick={onClick}
    >
      <p>{children}</p>
    </button>
  );
};
