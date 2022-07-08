
import React, { useState, useEffect } from "react";

let index = 0;

  // const pointA = {lat: 46.592965, lon: -120.585230}
  // const pointB = {lat:46.592943, lon: -120.599589}

const geoLocation = (polyLine, setPolyline, distance, setDistance) => {

  const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    const miles = d * 0.621371;

    console.log('Distance in Miles: ', miles)
    return miles;
  }
  
  const deg2rad = (deg) =>{
    return deg * (Math.PI/180)
  }

  const onSuccess = (location) => {
    // console.log(index++);
    setPolyline(polyLine => [...polyLine,[location.coords.latitude, location.coords.longitude]]);
    if(polyLine.length > 1){
      setDistance(distance + getDistanceFromLatLonInKm(polyLine[polyLine.length-1][0], polyLine[polyLine.length-1][1], location.coords.latitude, location.coords.longitude));
    }
  };
  
  const onError = (error) => {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  };
  navigator.geolocation.watchPosition(onSuccess, onError);

};

export default geoLocation;
