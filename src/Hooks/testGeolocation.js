let testGeoID = null;

const SPEED = 0.00002;

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

const testGeolocation = (
  setPolyLine,
  setDistance,
  setLocation,
  location,
  setStart,
  setMs
) => {
  const setNewLocation = (location, direction) => {
    location[0] += direction[0];
    location[1] += direction[1];
    setLocation(location);
    setPolyLine((polyLine) => {
      if (
        polyLine.length > 0 &&
        !locationDistanceCheck(
          polyLine[polyLine.length - 1][0],
          polyLine[polyLine.length - 1][1],
          location[0],
          location[1]
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
              location[0],
              location[1]
            )
          );
        });
      }
      return [...polyLine, [location[0], location[1]]];
    });
  };
  if (testGeoID) {
    clearInterval(testGeoID);
    testGeoID = null;
  } else {
    const directions = [
      [SPEED, 0],
      [0, -SPEED],
      [-SPEED, 0],
      [0, SPEED],
    ];

    let waitTime = 0;

    const runSingleDirection = (direction) => {
      let tempId;
      setTimeout(() => {
        tempId = setInterval(() => setNewLocation(location, direction), 50);
      }, waitTime);
      waitTime += 5000;
      setTimeout(() => {
        clearInterval(tempId);
      }, waitTime);
    };
    directions.forEach((direction) => {
      runSingleDirection(direction);
    });
    setTimeout(() => {
      setStart(false);
      setMs(0);
      setDistance(0);
      setPolyLine([]);
    }, 20000);
  }
};

function locationDistanceCheck(lat1, lng1, lat2, lng2) {
  const distanceDiff = getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2);

  if (distanceDiff > 0.004) {
    return true;
  }
  return false;
}

export default testGeolocation;
