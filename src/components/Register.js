import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchUser, postUser } from "../utils";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../context/UserContext";

export default function Register(props) {
  const [newUser, setNewUser] = useState({});
  const [registrationError, setRegistrationError] = useState(false);
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
    setNewUser({ ...newUser, avatar_url: event.target.value });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    postUser(newUser.username, newUser.name, newUser.avatar_url)
      .then((response) => {
        return fetchUser(response.username);
      })
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((err) => {
        console.log(err);
        setRegistrationError(true);
      });

    navigate("/profile");
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label for="username">Username: </label>
        <input
          type="text"
          id="username"
          value={newUser.username}
          onChange={handleUsernameInput}
          required
        />
        <br />
        <label for="name">Name: </label>
        <input
          type="text"
          id="name"
          value={newUser.name}
          onChange={handleNameInput}
          required
        />
        <br />
        <label for="avatar">Avatar: </label>
        <input
          type="file"
          id="avatar"
          value={newUser.avatar_url}
          onChange={handleAvatarInput}
          accept="image/*"
        />
        <br />
        <button type="submit">Register</button>
      </form>
      {registrationError ? <p>Username already exists.</p> : null}
      <Link to="/login">Already have an account?</Link>
    </div>
  );
}
