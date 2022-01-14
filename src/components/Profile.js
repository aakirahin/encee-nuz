import React from "react";
import BackLink from "./BackLink";
import { useCurrentUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import { fetchArticlesByUser, patchUserAvatar } from "../utils";
import { Link } from "react-router-dom";

export default function Profile({ resetTopic }) {
  const [userArticles, setUserArticles] = useState([]);
  const [avatarClicked, setAvatarClicked] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [avatarError, setAvatarError] = useState(false);
  const [userError, setUserError] = useState(false);
  const { currentUser, logOut } = useCurrentUser();

  useEffect(() => {
    fetchArticlesByUser(currentUser.username)
      .then((response) => {
        setUserArticles(response);
      })
      .catch((err) => {
        setUserError(true);
      });
  }, [currentUser]);

  const changeAvatar = (event) => {
    event.preventDefault();
    patchUserAvatar(currentUser.username, newAvatar).catch((err) => {
      setAvatarError(true);
    });
    setAvatarClicked(false);
  };

  return userError ? (
    <p>Could not load user.</p>
  ) : (
    <div id="profile">
      <BackLink resetTopic={resetTopic} />
      <img
        className="avatar"
        src={currentUser.avatar_url}
        alt="avatar"
        width="200"
        onClick={() => {
          setAvatarClicked(true);
        }}
      />
      <div id="edit-message">Edit</div>
      {avatarClicked && (
        <>
          <form onSubmit={changeAvatar}>
            <input
              type="text"
              id="new-avatar"
              value={newAvatar}
              onChange={(event) => setNewAvatar(event.target.value)}
            />
            <button id="change-avatar" type="submit">
              Change avatar
            </button>
          </form>
          <button id="cancel-change" onClick={() => setAvatarClicked(false)}>
            Cancel
          </button>
        </>
      )}
      {avatarError && <p>Could not update avatar.</p>}
      <h2 id="name">{currentUser.name}</h2>
      <p id="username">{currentUser.username}</p>
      <Link id="sign-out" to="/" onClick={logOut}>
        Sign out
      </Link>
      {userArticles.length !== 0 ? (
        <div id="user-articles">
          <h2>Your articles</h2>
          <ul>
            {userArticles.map((article) => {
              return (
                <li className="user-article">
                  <Link to={`/articles/${article.article_id}`}>
                    <p>{article.title}</p>
                  </Link>
                  <p>
                    {article.author}, {article.created_at.substring(0, 9)}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>You haven't written anything yet...</p>
      )}
    </div>
  );
}
