import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchUser, postUser } from "../utils";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../context/UserContext";
import BackLink from "./BackLink";
import urlRegex from "url-regex";

export default function Register({ resetTopic }) {
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    avatar_url: "",
  });
  const [registrationError, setRegistrationError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  let navigate = useNavigate();

  const handleUsernameInput = (event) => {
    setRegistrationError(false);
    setNewUser({ ...newUser, username: event.target.value });
  };

  const handleNameInput = (event) => {
    setNewUser({ ...newUser, name: event.target.value });
  };

  const handleAvatarInput = (event) => {
    setAvatarError(false);
    setNewUser({ ...newUser, avatar_url: event.target.value });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (!urlRegex().test(event.target.value)) {
      setAvatarError(true);
    }

    postUser(newUser.username, newUser.name, newUser.avatar_url)
      .then((response) => {
        return fetchUser(response.username);
      })
      .then((response) => {
        setCurrentUser(response);
        navigate(`/profile/${response.username}`);
      })
      .catch((err) => {
        setRegistrationError(true);
      });
  };

  return (
    <div id="register">
      <div className="register-exit">
        <BackLink resetTopic={resetTopic} />
      </div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label className="username">Username: </label>
        <input
          type="text"
          id="username"
          value={newUser.username}
          onChange={handleUsernameInput}
          required
        />
        <br />
        <label className="name">Name: </label>
        <input
          type="text"
          id="name"
          value={newUser.name}
          onChange={handleNameInput}
          required
        />
        <br />
        <label className="avatar-url">Avatar URL: </label>
        <input
          type="text"
          id="avatar-url"
          value={newUser.avatar_url}
          onChange={handleAvatarInput}
        />
        {avatarError && <p>Please enter a valid URL.</p>}
        {registrationError && <p>Username already exists.</p>}
        <button type="submit">Join us!</button>
      </form>
      <div className="login-link">
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
}
