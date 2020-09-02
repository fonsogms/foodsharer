import React, { useState, useEffect } from "react";
import { FoodDto } from "../foodDto.interface";
import axios from "axios";
const FoodDetails = (props) => {
  const [foodDto, setFoodDto] = useState<FoodDto>({
    title: "",
    description: "",
    latitude: 0,
    longitude: 0,
    address: "",
    expiryDate: "",
    pictures: [],
  });
  //const [uploaded, setUploaded] = useState<boolean>(false);
  useEffect(() => {
    const getData = async (): Promise<void> => {
      console.log(props.token);

      try {
        const { data } = await axios.get(
          process.env.REACT_APP_DOMAIN + "/api/food/" + props.match.params.id,
          { headers: { Authorization: "Bearer " + props.token } }
        );

        setFoodDto(data);
      } catch (err) {
        console.log(err);
        console.log(err.response.data.message);
      }
    };
    getData();
  }, [props.token]);
  console.log(foodDto.pictures[0]);
  return (
    <div>
      {Object.keys(foodDto).map((key, index) => {
        console.log(foodDto, key);
        if (typeof foodDto[key] === "string") {
          return (
            <div key={index}>
              <h1>
                {key}: {foodDto[key]}
              </h1>
            </div>
          );
        }
        if (typeof foodDto[key] === "object") {
          console.log("happening");
          return (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {foodDto[key].map((elem, index) => {
                return (
                  <img
                    key={index}
                    src={elem.url}
                    alt="food_pics"
                    style={{ width: "100px", height: "auto" }}
                  />
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
};

export default FoodDetails;
