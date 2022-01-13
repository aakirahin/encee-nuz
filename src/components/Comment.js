import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react/cjs/react.development";
import { useCurrentUser } from "../context/UserContext";
import { patchCommentVotes, deleteComment } from "../utils";

export default function Comment({ comment }) {
  const [commentVotes, setCommentVotes] = useState(comment.votes);
  const [commentVotesClick, setCommentVotesClick] = useState([]);
  const { currentUser, loggedIn } = useCurrentUser();
  let navigate = useNavigate();

  const handleCommentVotes = () => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    let inc_vote = 1;
    if (commentVotesClick.length % 2) {
      inc_vote = -1;
    }
    setCommentVotes((currentVotes) => currentVotes + inc_vote);
    patchCommentVotes(comment.comment_id, currentUser.username, inc_vote).catch(
      (err) => {
        console.log(err);
        setCommentVotesClick((currentClicks) => {
          currentClicks.pop();
          return currentClicks;
        });
        setCommentVotes((currentVotes) => currentVotes - inc_vote);
      }
    );
    setCommentVotesClick([...commentVotesClick, "clicked"]);
  };

  const handleDeletion = (commentID) => {
    deleteComment(commentID)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {});
  };

  return (
    <li>
      <p>
        <strong>{comment.author}</strong> {comment.created_at.substring(0, 9)}
        {currentUser.username === comment.author ? (
          <>
            <button>Edit</button>
            <button onClick={handleDeletion(comment.comment_id)}>Delete</button>
          </>
        ) : null}
      </p>
      <p>{comment.body}</p>
      <p>
        {commentVotes} <button onClick={handleCommentVotes}>Agreed!</button>
      </p>
    </li>
  );
}
