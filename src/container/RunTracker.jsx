import React, { useState, useEffect } from "react";
import { MapContainer, useMap, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "../App.css";
import geoLocation from "../Hooks/useGeoLocation";
import SimpleSlide from "../component/SlidingNavBar";
import Timer from "../component/Timer";
import testGeolocation from "../Hooks/testGeolocation";

export default function RunTracker() {
  const [polyLine, setPolyLine] = useState([]);
  const [location, setLocation] = useState([]);
  const [distance, setDistance] = useState(0);
  const [start, setStart] = useState(false);

  const blackOptions = { color: "black" };

  function success(pos) {
    const crd = pos.coords;

    setLocation([crd.latitude, crd.longitude]);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // const trackOptions = {
  //   enableHighAccuracy: true,
  //   maximumAge: 30000,
  //   timeout: 5000,
  // };

  function DefaultLocation() {
    const map = useMap();

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoidmFuZGFyc2luIiwiYSI6ImNsNTE0cDFlMDAyNHAzanFodWhnendrbDUifQ.Cn9XJ_LHFWB0G4gsgZe1Gw",
      }
    ).addTo(map);
  }

  const dummyGeolocation = () => {
    setStart(!start);
    testGeolocation(setPolyLine, setDistance, setLocation);
    if (start) {
      console.log("Initial pos: ", polyLine[0]);
      console.log("Last pos: ", polyLine[polyLine.length - 1]);
    }
  };

  return !location.length ? null : (
    <div className="runTracker">
      <div>
        <SimpleSlide />
      </div>
      <div>
        <MapContainer center={location} zoom={18} scrollWheelZoom={true}>
          <Marker position={location}>
            <Popup>
              Ha!!!!. <br /> I am not here Kevin.
            </Popup>
          </Marker>
          <Polyline pathOptions={blackOptions} positions={polyLine} />
          <DefaultLocation />
        </MapContainer>
      </div>
      {/* <div>
        {polyLine.map((e, i) => {
          return (
            <div key={i}>
              lat:{e[0]}, lng:{e[1]}
            </div>
          );
        })}
      </div> */}
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
        <button onClick={dummyGeolocation}>Dummy Test</button>
      </div>
      <Timer start={start} />
      <div>
        <h1>{distance}</h1>
      </div>
    </div>
  );
}
