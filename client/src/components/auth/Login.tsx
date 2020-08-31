import React, { useState, SyntheticEvent } from "react";
import { setToken } from "../../token.info";
const Login = (props) => {
  interface LoginDto {
    username: string;
    password: string;
  }

  const [loginDto, setLoginDto] = useState<LoginDto | undefined>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage]: [string[], Function] = useState([""]);

  const handleChange = (e: SyntheticEvent): void => {
    const { name, value } = e.target;
    setLoginDto({ ...loginDto, [name]: value });
  };
  const signIn = async (e: SyntheticEvent, signIn: LoginDto): Promise<void> => {
    e.preventDefault();
    try {
      console.log("happening");
      const requestBody = await JSON.stringify(signIn);
      const body = await fetch(
        process.env.REACT_APP_DOMAIN + "/api/auth/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: requestBody,
        }
      );
      const { token } = await body.json();

      /*   const token: string = await axios.post(
        process.env.REACT_APP_DOMAIN + "/api/auth/signIn",
        signIn
      ); */
      setToken(token);
      console.log(token);
      props.history.push("/home");
    } catch (error) {
      console.log(error);
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
