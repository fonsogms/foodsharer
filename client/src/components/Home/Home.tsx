import React, { useEffect, useState, useContext } from "react";
import Map from "./Map";
interface LatLong {
  latitude: number;
  longitude: number;
}

const Home = (props) => {
  const [location, setLocation] = useState<LatLong>({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition((data) => {
        const { coords } = data;
        console.log(coords);
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
          <Map location={location}></Map>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
