import React, { useState, useEffect } from "react";
import {
  MapContainer,
  useMap,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";
import L from "leaflet";
import "../App.css";
import geoLocation from "../Hooks/useGeoLocation";


export default function RunTracker() {
  const API_KEY =`${process.env.REACT_APP_API_KEY}`

  const [polyline, setPolyLine] = useState([]);
  const [location, setLocation] = useState([]);
  const [distance, setDistance] = useState(0);

  const blackOptions = { color: 'black' }

  function success(pos) {
    const crd = pos.coords;

    setLocation([crd.latitude, crd.longitude]);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  console.log('****', distance)
  // const trackOptions = {
  //   enableHighAccuracy: true,
  //   maximumAge: 30000,
  //   timeout: 5000,
  // };

  function DefaultLocation() {
    const map = useMap();

  console.log('API Key: ', API_KEY)

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
          API_KEY,
      }
    ).addTo(map);
  }


  return !location.length ? null : (
    <div>
      <div id="tracker"></div>
      <div className="track-control">
        <div>
          {polyline.map((e, i)=>{
            return (<div key={i}>
              lat:{e[0]},
              lng:{e[1]}
            </div>)
          })}
        </div>
        <label className="switch">
          <input type="checkbox" onClick={() => {
            geoLocation(polyline, setPolyLine, distance, setDistance);
          }}/>
          <span className="slider round"></span>
        </label>
        <div>
          <h1>
            {distance}
          </h1>
        </div>
      </div>
      <div>

        <MapContainer center={location} zoom={18} scrollWheelZoom={true}>
          <Marker position={location}>
            <Popup>
              Ha!!!!. <br /> I am not here Kevin.
            </Popup>
          </Marker>
          <Polyline pathOptions={blackOptions} positions={polyline} />
          <DefaultLocation />
        </MapContainer>
      </div>
    </div>
  );
}
