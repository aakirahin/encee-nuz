import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../context/UserContext";
import { postComment } from "../utils";

export default function NewComment({ articleID, setCommentsChange }) {
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState(false);
  const { currentUser, loggedIn } = useCurrentUser();
  let navigate = useNavigate();

  const handleCommentInput = (event) => {
    setNewComment(event.target.value);
  };

  const handleNewComment = (event) => {
    event.preventDefault();

    if (!loggedIn) {
      navigate("/login");
      return;
    } else if (newComment === "" || newComment === " ") {
      return;
    }

    postComment(articleID, currentUser.username, newComment)
      .then((response) => {
        setCommentsChange(true);
      })
      .catch((err) => {
        setCommentError(true);
      });
    setCommentsChange(false);
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
      {commentError && <p>Could not post comment.</p>}
    </div>
  );
}
