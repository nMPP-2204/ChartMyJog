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
import Background from "../assets/img/Background.gif";

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
  return (
    <div style={{ backgroundImage: `url(${Background})` }}>
      <div className="trackContainer text-white">
        <div className="distanceTimer">
          <div className="distance">
            <div style={{ marginLeft: "30px" }}>
              <span className="hrMin">{distance.toFixed(2)}</span>
            </div>
            <div style={{ fontSize: "12px", marginLeft: "32px" }}>
              DISTANCE(MI)
            </div>
          </div>
          <div className="timer">
            <div>
              <span className="hrMin">{hr}:</span>
              <span className="hrMin">{min}:</span>

              <span className="hrMin">{sec}:</span>
              <span className="ms">{("0" + ((ms / 10) % 100)).slice(-2)}</span>
            </div>
            <div style={{ fontSize: "12px" }}>DURATION</div>
          </div>
        </div>
        <div className="tracker">
          {!start && ms === 0 && (
            <div className="tracker">
              <button
                className="startRun text-black"
                onClick={() => {
                  setStart(!start);
                  geoLocation(setPolyLine, setDistance);
                }}
              >
                Start Run
              </button>
            </div>
          )}
          {start && (
            <div>
              <Button
                className="startRun"
                onClick={() => {
                  setPause(!pause);
                  setStart(!start);
                }}
              >
                Pause Run
              </Button>
            </div>
          )}
          {pause && (
            <div>
              <Button className="startRun" onClick={handleOpen}>
                END RUN
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="modalComponents">
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
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
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
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
                        setPause(!pause);
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
          )}
          {pause && (
            <div>
              <Button
                className="startRun"
                onClick={() => {
                  setPause(!pause);
                  setStart(!start);
                }}
              >
                RESUME
              </Button>
              <Button
                className="startRun"
                onClick={() => {
                  setMs(0);
                  setDistance(0);
                  setPause(!pause);
                }}
              >
                RESET
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="tracker">
        <TestRun
          setStart={setStart}
          setPolyLine={setPolyLine}
          setDistance={setDistance}
          setLocation={setLocation}
          location={location}
          start={start}
          setMs={setMs}
        />
      </div>
    </div>
  );
}
