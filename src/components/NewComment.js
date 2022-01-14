import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../context/UserContext";
import { postComment } from "../utils";

export default function NewComment({ articleID, comments, setComments }) {
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState(false);
  const { currentUser, loggedIn } = useCurrentUser();
  let navigate = useNavigate();

  const handleCommentInput = (event) => {
    setNewComment(event.target.value);
  };

  const handleNewComment = (event) => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    event.preventDefault();
    postComment(articleID, currentUser.username, newComment)
      .then((response) => {
        // setComments([response, ...comments]);
      })
      .catch((err) => {
        console.log(err);
        setCommentError(true);
      });
  };

  return (
    <div id="new-comment">
      <form onSubmit={handleNewComment}>
        {loggedIn ? (
          <img
            id="comment-avatar"
            src={currentUser.avatar_url}
            alt="avatar"
            width="50"
          />
        ) : (
          <img
            id="comment-avatar"
            src="https://www.acumarketing.com/acupuncture-websites/wp-content/uploads/2020/01/anonymous-avatar-sm.jpg"
            alt="avatar"
            width="50"
          />
        )}
        <textarea
          type="text"
          id="new-comment"
          value={newComment}
          onChange={handleCommentInput}
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}
