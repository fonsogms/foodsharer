import React, { SyntheticEvent, useState, ChangeEvent } from "react";
import axios from "axios";
import { getToken } from "../../token.info";
const FileUpload = (props) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setLoading(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "foodSharer");

    /*    await axios.post(
      process.env.REACT_APP_DOMAIN + "/api/food/cloudinaryUpload",
      {
        headers: {
          Authorization: "Bearer " + getToken(),
          // "content-type": `multipart/form-data;`,
        },
      },
      { data: data }
    ); */
    try {
      const fileInfo = await axios.post(
        `${process.env.REACT_APP_CLOUDINARY}`,
        data
      );
      setLoading(false);
      props.setFoodDto({
        ...props.foodDto,
        pictures: [
          { url: fileInfo.data.secure_url, public_id: fileInfo.data.public_id },
          ...props.foodDto.pictures,
        ],
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const deletePic = async (id: string): Promise<void> => {
    const filteredPics = props.foodDto.pictures.filter((elem) => {
      if (elem.public_id === id) {
        return false;
      } else {
        return true;
      }
    });

    await axios.delete(process.env.REACT_APP_DOMAIN + "/api/food/cloudinary", {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      data: { id: [id] },
    });

    props.setFoodDto({ ...props.foodDto, pictures: filteredPics });
  };
  return (
    <div>
      <h4>Add Pictures</h4>
      <div>
        {loading ? (
          <div>
            <img
              style={{ width: "200px", height: "auto" }}
              alt="loading_Image"
              src="/6d391369321565.5b7d0d570e829.gif"
            />
          </div>
        ) : (
          <input type="file" name="pictures" onChange={uploadImage} />
        )}
      </div>

      {props.foodDto.pictures.length
        ? props.foodDto.pictures.map((elem, index) => {
            return (
              <div key={index}>
                <img src={elem.url} alt="food_image" />
                <div>
                  <button
                    onClick={(e: SyntheticEvent) => {
                      e.preventDefault();
                      deletePic(elem.public_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default FileUpload;
