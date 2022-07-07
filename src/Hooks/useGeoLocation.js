
import React, { useState, useEffect } from "react";

let index = 0;

const geoLocation = (polyLine, setPolyline) => {
  // const [location, setLocation] = useState({
  //   loaded: false,
  //   coordinates: { lat: "", lng: "" },
  // });

  const onSuccess = (location) => {
    console.log(index++);
    setPolyline(polyLine => [...polyLine,[location.coords.latitude, location.coords.longitude]]);
    // setLocation({
    //   loaded: true,
    //   coordinates: {
    //     lat: location.coords.latitude,
    //     lng: location.coords.longitude,
    //   },
    // });
  };

  const onError = (error) => {
    // setLocation({
    //   loaded: true,
    //   error: {
    //     code: error.code,
    //     message: error.message,
    //   },
    // });
  };
  navigator.geolocation.watchPosition(onSuccess, onError);
  // useEffect(() => {
  //   if (!("geolocation" in navigator)) {
  //     onError({
  //       code: 0,
  //       message: "Geolocation not supported",
  //     });
  //   }

  //   const watchID = navigator.geolocation.watchPosition(onSuccess, onError);

  //   return ()=>{
  //     navigator.geolocation.clearWatch(watchID);
  //   }
  // }, []);

  //return location;
};

export default geoLocation;
