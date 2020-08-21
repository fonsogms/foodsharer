import React, { useState, SyntheticEvent } from "react";
import axios from "axios";
const Login = (props) => {
  interface LoginDto {
    username: string;
    password: string;
  }

  const [loginDto, setLoginDto] = useState<LoginDto | undefined>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string[]>([""]);

  const handleChange = (e: SyntheticEvent): void => {
    const { name, value } = e.target;
    setLoginDto({ ...loginDto, [name]: value });
  };
  const signIn = async (e: SyntheticEvent, signIn: LoginDto): Promise<void> => {
    e.preventDefault();

    try {
      await axios.post<string>(
        process.env.REACT_APP_DOMAIN + "/api/auth/signIn",
        signIn
      );
      props.history.push("/home");
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div>
      <h1>Please Log in</h1>
      <form action="">
        <input
          type="text"
          onChange={handleChange}
          name="username"
          value={loginDto.username}
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={loginDto.password}
        />
        <div>
          <button
            onClick={(e) => {
              signIn(e, loginDto);
            }}
          >
            Login
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

export default Login;
