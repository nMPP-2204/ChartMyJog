let map = L.map("tracker").setView([46.586, -120.617], 15);
let isStart = null;
let currentMarker = null;

const trackOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 5000,
};

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

const startTracking = () => {
  if(!navigator.geolocation) {
    report("Geolocation is not supported by your browser");
    return;
  } else {
    return navigator.geolocation.watchPosition(success, error, trackOptions);
  }
}

const updateMap = (event) => {

  const { latitude, longitude, timestamp, accuracy, altitude, altitudeAccuracy, heading, speed } = event.detail;
  
  report(`2. Received lat: ${latitude} | lng: ${longitude} | accuracy: ${accuracy} | altitude: ${altitude} | altitudeAccuracy ${altitudeAccuracy} | heading: ${heading} | speed: ${speed} | timestamp: ${timestamp}`);

 drawNewMarker(event.detail)
}

const drawNewMarker = (detail) => {
  const { latitude, longitude } = detail;

  return new Promise((resolve) => {
    console.log(detail);
    if (currentMarker == null) {
      const marker = L.marker([latitude, longitude]).addTo(map);
    return resolve(detail);
    }
  })
}

const success = (position) => {
  const { latitude, longitude } = position.coords;
  const timestamp = (new Date(Date.now())).toISOString();

  report( `1. Detected at ${timestamp}`);

  createNewEvent(latitude, longitude, timestamp);
}

const error = (err) => report(`Unable to retrieve your location! ${err.code} - ${err.message}`);

const report = ((message) => message);

const createNewEvent = (latitude, longitude, timestamp) => {
  const geoEvent = new CustomEvent("GEO_EVENT", {
    detail: {
      latitude,
      longitude,
      timestamp,
    }
  });
  document.querySelector("#tracker").dispatchEvent(geoEvent);
}

const toggle = () => {
  if (isStart === null) {
    isStart = true;
    startTracking();
  } else {
    isStart = !isStart;
  }
}

document.querySelector("#tracker")
  .addEventListener("GEO_EVENT", updateMap);