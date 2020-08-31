import React, { useState, useEffect, SyntheticEvent } from "react";
import Address from "./Address";
import FileUpload from "./FileUpload";
import axios from "axios";
import { getToken } from "../../token.info";
const CreateFood = (props) => {
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
  const [errorMessage, setErrorMessage]: [string[], Function] = useState([""]);

  const [isUploaded, setIsUploaded]: [Boolean, Function] = useState(false);
  const handleChange = (e: SyntheticEvent): void => {
    const { name, value } = e.target;
    setFoodDto({ ...foodDto, [name]: value });
  };
  useEffect(() => {
    if (!isUploaded) {
      window.onbeforeunload = async function handleUnload(event) {
        let ids = foodDto.pictures.map((elem) => {
          return elem.public_id;
        });

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
      };
      console.log("delete");
    } else {
      props.history.push("/home");
    }
  }, [foodDto, isUploaded, props]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
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
      console.log(res);
      setIsUploaded(true);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      let newErrorMessage: string[] = [""];
      if (typeof error.response.data.message == "string") {
        newErrorMessage[0] = error.response.data.message;
      } else {
        newErrorMessage = error.response.data.message;
      }
      setErrorMessage(newErrorMessage);
    }
  };

  return (
    <div>
      <form action="">
        <div>
          <div>
            {errorMessage[0] &&
              errorMessage.map((elem, index) => {
                return <h2 key={index}>{elem}</h2>;
              })}
          </div>
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
