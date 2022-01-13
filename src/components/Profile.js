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
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    fetchArticlesByUser(currentUser.username)
      .then((response) => {
        setUserArticles(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeAvatar = (event) => {
    event.preventDefault();
    patchUserAvatar(currentUser.username, newAvatar)
      .then((response) => console.log(response, newAvatar))
      .catch((err) => {
        console.log(err);
      });
    setAvatarClicked(false);
  };

  return (
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
              type="file"
              id="new-avatar"
              value={newAvatar}
              onChange={(event) => setNewAvatar(event.target.value)}
              accept="image/*"
            />
            <button type="submit">Change avatar</button>
          </form>
          <button onClick={() => setAvatarClicked(false)}>Cancel</button>
        </>
      )}
      <h2>{currentUser.name}</h2>
      {userArticles.length !== 0 ? (
        <div id="user-articles">
          <ul>
            {userArticles.map((article) => {
              return (
                <li>
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
