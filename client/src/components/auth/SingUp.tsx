import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";

const SingUp = () => {
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
      const { data } = await axios.post<string>("/api/auth/signUp", signUp);
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };
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
          errorMessage.map((elem) => {
            return <h2>{elem}</h2>;
          })}
      </div>
    </div>
  );
};

export default SingUp;
