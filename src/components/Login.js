import React, { useState } from "react";
import { fetchUser } from "../utils";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../context/UserContext";
import BackLink from "./BackLink";

export default function Login({ resetTopic }) {
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUser();
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
        navigate(`/profile/${currentUser.username}`);
      })
      .catch((err) => {
        setLoginError(true);
      });
  };

  return (
    <div id="login">
      <div className="login-exit">
        <BackLink resetTopic={resetTopic} />
      </div>
      <h1>Welcome back!</h1>
      <form onSubmit={handleLogin}>
        <label for="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameInput}
          required
        />
        <button type="submit">Let's gooo!</button>
      </form>
      {loginError ? <p>Username does not exist.</p> : null}
      <div className="register-link">
        <Link to="/register">Don't have an account?</Link>
      </div>
    </div>
  );
}
