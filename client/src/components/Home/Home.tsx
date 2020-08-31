import React, { useEffect, useState } from "react";

interface LatLong {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const Home = () => {
  const [location, setLocation] = useState<LatLong>({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  });
  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        setLocation(position);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h1>Welcome User</h1>
      {location && <h2>{location.coords.latitude}</h2>}
    </div>
  );
};

export default Home;
