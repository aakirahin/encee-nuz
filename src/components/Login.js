import React, { useState } from "react";
import { fetchUser } from "../utils";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../context/UserContext";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  let navigate = useNavigate();

  const handleUsernameInput = (event) => {
    setLoginError(false);
    setUsername(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetchUser(username)
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
      });
    navigate("/profile");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label for="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameInput}
          required
        />
        <button type="submit">Login</button>
      </form>
      {loginError ? <p>Username does not exist.</p> : null}
      <Link to="/register">Sign up today!</Link>
    </div>
  );
}
