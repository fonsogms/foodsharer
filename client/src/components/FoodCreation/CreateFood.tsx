import React, { useState, useEffect, SyntheticEvent } from "react";
import Address from "./Address";
import FileUpload from "./FileUpload";
import axios from "axios";
import { getToken } from "../../token.info";
const CreateFood = () => {
  interface Pictures {
    url: string;
    public_id: string;
  }
  interface FoodDto {
    title: string;
    expiryDate: string;
    description: string;
    latitude: number;
    longitude: number;
    address: string;
    pictures: Pictures[];
  }

  const [foodDto, setFoodDto]: [FoodDto, Function] = useState({
    title: "",
    description: "",
    latitude: 0,
    longitude: 0,
    address: "",
    expiryDate: "",
    pictures: [],
  });

  const [isUploaded, setIsUploaded] = useState<Boolean>(false);
  const handleChange = (e: SyntheticEvent): void => {
    const { name, value } = e.target;
    setFoodDto({ ...foodDto, [name]: value });
  };
  useEffect(() => {
    window.onbeforeunload = async function handleUnload(event) {
      if (!isUploaded) {
        let ids = foodDto.pictures.map((elem) => {
          return elem.public_id;
        });
        console.log(ids);

        await axios.delete(
          process.env.REACT_APP_DOMAIN + "/api/food/cloudinary",
          {
            headers: {
              Authorization: "Bearer " + getToken(),
            },
            data: {
              id: ids,
            },
          }
        );
      }

      console.log("delete");
    };
  }, [foodDto]);
  console.log(foodDto);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(getToken());
    const token = `Bearer ${getToken()}`;
    try {
      const res = await axios.post(
        process.env.REACT_APP_DOMAIN + "/api/food/add",
        foodDto,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIsUploaded(true);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
    }
  };

  return (
    <div>
      <form action="">
        <div>
          <h4> Title</h4>
          <div>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={foodDto.title}
            />
          </div>
        </div>
        <div>
          <h4>Description</h4>
          <div>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={foodDto.description}
            />
          </div>
        </div>
        <div>
          <h4>Expiry Date</h4>
          <div>
            <input
              type="Date"
              name="expiryDate"
              onChange={handleChange}
              value={foodDto.expiryDate}
            />
          </div>
        </div>

        <Address foodDto={foodDto} setFoodDto={setFoodDto}></Address>
        <FileUpload setFoodDto={setFoodDto} foodDto={foodDto}></FileUpload>
        <button onClick={handleSubmit}>Add food</button>
      </form>
    </div>
  );
};

export default CreateFood;
