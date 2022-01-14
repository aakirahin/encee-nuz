import React from "react";
import BackLink from "./BackLink";
import { useCurrentUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import { fetchArticlesByUser, fetchUser, patchUserAvatar } from "../utils";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import urlRegex from "url-regex";

export default function Profile({ resetTopic }) {
  const { username } = useParams();
  const [urlUser, setURLUser] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [avatarClicked, setAvatarClicked] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [avatarError, setAvatarError] = useState(false);
  const [userError, setUserError] = useState(false);
  const { currentUser, logOut } = useCurrentUser();

  useEffect(() => {
    fetchUser(username).then((response) => {
      setURLUser(response);
    });
    fetchArticlesByUser(username)
      .then((response) => {
        setUserArticles(response);
      })
      .catch((err) => {
        setUserError(true);
      });
  }, [username]);

  const changeAvatar = (event) => {
    event.preventDefault();

    if (!urlRegex().test(newAvatar)) {
      setAvatarError(true);
      return;
    }

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
        src={urlUser.avatar_url}
        alt="avatar"
        width="200"
        onClick={() => {
          setAvatarClicked(true);
        }}
      />
      {currentUser.username === urlUser.username ? (
        <>
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
              <button
                id="cancel-change"
                onClick={() => setAvatarClicked(false)}
              >
                Cancel
              </button>
            </>
          )}
          {avatarError && <p>Could not update avatar.</p>}
        </>
      ) : null}
      <h2 id="name">{urlUser.name}</h2>
      <p id="username">{urlUser.username}</p>
      {currentUser.username === urlUser.username && (
        <Link id="sign-out" to="/" onClick={logOut}>
          Sign out
        </Link>
      )}
      <h2>{urlUser.name}'s articles</h2>
      {userArticles.length !== 0 ? (
        <div id="user-articles">
          <ul>
            {userArticles.map((article) => {
              return (
                <li className="user-article" key={article.article_id}>
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
        <p>Nothing here yet...</p>
      )}
    </div>
  );
}
