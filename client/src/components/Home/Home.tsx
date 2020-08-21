import React, { useEffect, useState } from "react";

const Home = () => {
  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h1>Welcome User</h1>
    </div>
  );
};

export default Home;
