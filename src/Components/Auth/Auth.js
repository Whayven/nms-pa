import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser, registerUser } from "../../redux/userReducer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Button = styled.button`
  background: black;
  border: 3px solid white;
  border-radius: 3px;
  color: white;
  height: 30px;
  font-weight:bold;
  cursor: pointer;
  margin-top: 5px;
  :hover {
    border-color: grey;
    color: grey;
  }
`;


const Auth = (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.user.loggedIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    dispatch(registerUser(username, password))
  };

  const login = () => {
    dispatch(loginUser(username, password))
  };

  if (loggedIn) {
    return (
      <Redirect to="/home" />
    )
  }

  return (
    <Container>
      <h1>Planetary Archive</h1>
      <br />
      <Container>
        <label>Username: </label>
        <input
          value={username}
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />{" "}
        <label>Password: </label>
        <input
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <Button onClick={login}>Login</Button> <Button onClick={register}>Register</Button>
      </Container>
    </Container>
  );
};

export default Auth;
