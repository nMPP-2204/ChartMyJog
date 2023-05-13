import "../App.css";

import React, { useState, useEffect } from "react";

import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";

import Timer from "../component/Timer";
import Loader from "../component/Loader/Loader";
import { createRun } from "../utils/firestore";
import { domtoimage } from "dom-to-image";
import geoLocation from "../Hooks/useGeoLocation";

export default function RunTracker() {
  const API_KEY = `${process.env.REACT_APP_API_KEY}`;

  const [start, setStart] = useState(false);
  const [timerID, setTimerID] = useState(0);
  const [pause, setPause] = useState(false);
  const [polyLine, setPolyLine] = useState([]);
  const [location, setLocation] = useState([]);
  const [distance, setDistance] = useState(0);
  const [ms, setMs] = useState(0);

  useEffect(() => {
    if (start && !pause) {
      startTimer();
      geoLocation(setPolyLine, setDistance, true);
    } else if (start && pause) {
      setPause(true);
      geoLocation(setPolyLine, setDistance);
    } else {
      setMs(0);
      setDistance(0);
      setPolyLine([]);
      setPause(false);
    }

    return () => {
      clearTimer();
      geoLocation(setPolyLine, setDistance, false);
    };
  }, [start, pause]);

  const blackOptions = { color: "black" };

  function success(pos) {
    const crd = pos.coords;

    setLocation([crd.latitude, crd.longitude]);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  var runIcon = L.icon({
    iconUrl: "runIcon.png",

    iconSize: [38, 45], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor: [22, 65], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  const hr = JSON.stringify(Math.floor((ms / 3600000) % 60));
  const min = ("0" + Math.floor((ms / 60000) % 60)).slice(-2);
  const sec = ("0" + Math.floor((ms / 1000) % 60)).slice(-2);

  async function saveRun({ user, input, value, setValue, setInput }) {
    const node = document.getElementById("MapImage");
    const dataUrl = await domtoimage.toSvg(node);
    let pace = 0;
    if (distance) {
      const totalSec = +hr * 3600 + +min * 60 + +sec;
      pace = Math.ceil((totalSec / 60 / distance) * 100) / 100;
    }
    try {
      createRun({
        distance: distance,
        time: `${hr}:${min}:${sec}`,
        uid: user.uid,
        image: dataUrl,
        name: input,
        comment: value,
        pace,
      });
    } catch (error) {
      console.log(error);
    }

    setValue("");
    setInput("");
  }

  function startTimer() {
    const tID = setInterval(() => {
      setMs((ms) => {
        return ms + 10;
      });
    }, 10);

    setTimerID(tID);
  }

  function clearTimer() {
    setTimerID((timerID) => {
      clearInterval(timerID);
      return 0;
    });
  }

  return !location.length ? (
    <Loader />
  ) : (
    <div className="h-screen bg-white runTracker">
      <div id="MapImage">
        <MapContainer center={location} zoom={17} scrollWheelZoom={true}>
          <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            accessToken={API_KEY}
            zoomOffset={-1}
            maxZoom={22}
            id="mapbox/streets-v11"
            tileSize={512}
            minZoom={4}
          />
          {polyLine.length === 0 ? (
            <Marker position={location} icon={runIcon}>
              <Popup>
                Ha!!!!. <br /> I am not here Kevin.
              </Popup>
            </Marker>
          ) : (
            <Marker position={polyLine[polyLine.length - 1]}>
              <Popup>
                Ha!!!!. <br /> I am not here Kevin.
              </Popup>
            </Marker>
          )}
          <Polyline pathOptions={blackOptions} positions={polyLine} />
        </MapContainer>
      </div>
      <div className="text-lg font-bold md:text-center md:text-3xl">
        <div className="absolute z-20 flex justify-between w-3/5 md:w-3/4 right-8 top-20 ">
          <span>Distance (MI) -</span>
          <span>{distance.toFixed(2)}</span>
        </div>

        <div className="absolute z-20 flex justify-between w-3/5 md:w-3/4 right-8 top-28 ">
          <span>Duration -</span>
          <span>
            {hr}:{min}:{sec}:
            <span className="text-sm md:text-base">
              {("0" + ((ms / 10) % 100)).slice(-2)}
            </span>
          </span>
        </div>
      </div>

      <Timer
        start={start}
        distance={distance}
        setStart={setStart}
        setPolyLine={setPolyLine}
        setDistance={setDistance}
        setLocation={setLocation}
        location={location}
        saveRun={saveRun}
        setPause={setPause}
        pause={pause}
        ms={ms}
        clearTimer={clearTimer}
      />
    </div>
  );
}
