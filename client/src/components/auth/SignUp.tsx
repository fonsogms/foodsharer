import React, { useState, SyntheticEvent } from "react";
import axios from "axios";
import { setToken } from "../../token.info";

const SingUp = (props) => {
  interface RegisterDto {
    username: string;
    password: string;
  }

  const [registerDto, setRegisterDto] = useState<RegisterDto | undefined>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string[]>([""]);

  const handleChange = (e: SyntheticEvent): void => {
    const { name, value } = e.target;
    setRegisterDto({ ...registerDto, [name]: value });
  };
  const signUp = async (
    e: SyntheticEvent,
    signUp: RegisterDto
  ): Promise<void> => {
    e.preventDefault();

    try {
      const {
        data: { token },
      } = await axios.post<{
        token: string;
      }>(process.env.REACT_APP_DOMAIN + "/api/auth/signUp", signUp);
      setToken(token);
      props.history.push("/");
    } catch (error) {
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
  console.log(errorMessage);
  return (
    <div>
      <h1>Please Sign Up</h1>
      <form action="">
        <input
          type="text"
          onChange={handleChange}
          name="username"
          value={registerDto.username}
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={registerDto.password}
        />
        <div>
          <button
            onClick={(e) => {
              signUp(e, registerDto);
            }}
          >
            Register here
          </button>
        </div>
      </form>
      <div>
        {errorMessage[0] &&
          errorMessage.map((elem, index) => {
            return <h2 key={index}>{elem}</h2>;
          })}
      </div>
    </div>
  );
};

export default SingUp;
