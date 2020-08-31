import React, { useEffect, useState } from "react";
import Map from "./Map";
interface LatLong {
  latitude: number;
  longitude: number;
}

const Home = () => {
  const [location, setLocation] = useState<LatLong>({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition((data) => {
        const { coords } = data;
        setLocation(coords);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h1>Welcome User</h1>
      {location.latitude ? (
        <div>
          <h2>{location.latitude}</h2>
          <Map location={location}></Map>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
