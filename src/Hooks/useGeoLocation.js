import React, { useState, useEffect } from "react";

let index = 0;
let watchPoisitionId = null;

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  const miles = d * 0.621371;
  return miles;
};
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const geoLocation = (setPolyLine, setDistance, startTracker = false) => {
  const onSuccess = (location) => {
    setPolyLine((polyLine) => {
      if (
        polyLine.length > 0 &&
        !locationDistanceCheck(
          polyLine[polyLine.length - 1][0],
          polyLine[polyLine.length - 1][1],
          location.coords.latitude,
          location.coords.longitude
        )
      ) {
        return polyLine;
      }

      if (polyLine.length > 1) {
        setDistance((distance) => {
          return (
            distance +
            getDistanceFromLatLonInKm(
              polyLine[polyLine.length - 1][0],
              polyLine[polyLine.length - 1][1],
              location.coords.latitude,
              location.coords.longitude
            )
          );
        });
      }
      return [
        ...polyLine,
        [location.coords.latitude, location.coords.longitude],
      ];
    });
  };

  const onError = (error) => {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 500,
  };

  if (!startTracker) {
    navigator.geolocation.clearWatch(watchPoisitionId);
    watchPoisitionId = null;
    return null;
  }

  watchPoisitionId = navigator.geolocation.watchPosition(
    onSuccess,
    onError,
    options
  );
};

function locationDistanceCheck(lat1, lng1, lat2, lng2) {
  const distanceDiff = getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2);

  if (distanceDiff > 0.004) {
    return true;
  }
  return false;
}

export default geoLocation;
