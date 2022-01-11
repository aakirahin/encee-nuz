import React, { useState } from "react";
import { fetchUser } from "../utils";

export default function Login({ currentUser, setCurrentUser }) {
  const handleUsernameInput = (event) => {
    setCurrentUser({ ...currentUser, username: event.target.value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetchUser(currentUser.username)
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Welcome back!</h1>
      <form onSubmit={handleLogin}>
        <label for="username">Username: </label>
        <input
          type="text"
          id="username"
          value={currentUser.username}
          onChange={handleUsernameInput}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
