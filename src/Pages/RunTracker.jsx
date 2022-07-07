import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "../App.css";
import useGeoLocation from "../Hooks/useGeoLocation";

export default function RunTracker() {
  // let isStart = null;
  // let currentMarker = null;
  const location = useGeoLocation();

  // const trackOptions = {
  //   enableHighAccuracy: true,
  //   maximumAge: 30000,
  //   timeout: 5000,
  // };
  ///////////////Default Location///////////////////////////////
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
  /////////////////////////////////////////////////////////////////
  // const success = (position) => {
  //   const { latitude, longitude } = position.coords;
  //   const timestamp = new Date(Date.now()).toISOString();

  //   report(`1. Detected at ${timestamp}`);

  //   createNewEvent(latitude, longitude, timestamp);
  // };

  // const error = (err) =>
  //   report(`Unable to retrieve your location! ${err.code} - ${err.message}`);

  // const report = (message) => message;

  // const createNewEvent = (latitude, longitude, timestamp) => {
  //   const geoEvent = new CustomEvent("GEO_EVENT", {
  //     detail: {
  //       latitude,
  //       longitude,
  //       timestamp,
  //     },
  //   });
  //   document.querySelector("#tracker").dispatchEvent(geoEvent);
  // };

  // const startTracking = () => {
  //   if (!navigator.geolocation) {
  //     report("Geolocation is not supported by your browser");
  //     return;
  //   } else {
  //     console.log(
  //       navigator.geolocation.watchPosition(success, error, trackOptions)
  //     );
  //     return navigator.geolocation.watchPosition(success, error, trackOptions);
  //   }
  // };

  // const toggle = () => {
  //   if (isStart === null) {
  //     isStart = true;
  //     startTracking();
  //   } else {
  //     isStart = !isStart;
  //   }
  // };

  const zoomLevel = 11;

  const ShowMyLocation = () => {
    const map = useMap();

    if (location.loaded && !location.error) {
      map.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        zoomLevel,
        { animated: true }
      );
    } else {
      alert(location.error);
    }
    // const map = useMapEvents({
    //   click() {
    //     map.locate();
    //     //console.log
    //   },
    //   locationfound(location) {
    //     setPosition(location.coordinates.lat, location.coordinates.lng);
    //     map.flyTo(location.coordinates.lat, location.coordinates.lng, map.getZoom());
    //   },
    // });

    return location === null ? null : (
      <Marker position={[location.coordinates.lat, location.coordinates.lng]}>
        <Popup>This is I!!!</Popup>
      </Marker>
    );
  };

  return (
    <div>
      <div id="tracker"></div>
      <div className="track-control">
        {/* <button onClick={ShowMyLocation}>Show Location</button> */}
        {/* <label className="switch">
          <input type="checkbox" onClick={showMyLocation} />
          <span className="slider round"></span>
        </label> */}
        <Link to="/">Back to Home</Link>
      </div>
      <div>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
          <Marker position={[51.505, -0.09]}>
            <Popup>
              Ha!!!!. <br /> I am not here Kevin.
            </Popup>
          </Marker>
          <DefaultLocation />
          <ShowMyLocation />
          {/* {location.loaded && !location.error && (
            <Marker
              position={[location.coordinates.lat, location.coordinates.lng]}
            ></Marker>
          )} */}
        </MapContainer>
      </div>
    </div>
  );
}
