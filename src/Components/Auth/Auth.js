import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser, registerUser } from "../../redux/userReducer";

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
    <div>
      <h1>Planetary Archive</h1>
      <br />
      <div>
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
        <br />
        <button onClick={login}>Login</button> <button onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default Auth;
