import React, { useEffect, useState, useContext } from "react";
import Map from "./Map";
import axios from "axios";
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
    const getData = () => {
      navigator.geolocation.getCurrentPosition(async (data) => {
        const { coords } = data;
        const foodItems = await getLocations(
          coords.latitude,
          coords.longitude,
          10,
          props.token
        );
        console.log(foodItems);
        setLocation(coords);
      });
    };
    getData();
  }, []);
  const getLocations = async (
    latitude: number,
    longitude: number,
    distance: number,
    token: string
  ) => {
    try {
      const foodItems = await axios.get(
        process.env.REACT_APP_DOMAIN +
          `/api/food?latitude=${latitude}&longitude=${longitude}&distance=${distance}`,
        { headers: { Authorization: "Bearer " + token } }
      );
      return foodItems;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };
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
