import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react/cjs/react.development";
import { useCurrentUser } from "../context/UserContext";
import { patchCommentVotes, deleteComment, patchCommentBody } from "../utils";

export default function Comment({ comment, comments, setComments }) {
  const [commentVotes, setCommentVotes] = useState(comment.votes);
  const [commentVotesClick, setCommentVotesClick] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);
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

  const handleDeletion = () => {
    deleteComment(comment.comment_id)
      .then((response) => {
        setComments((...currentComments) => {
          return currentComments.filter(
            (eachComment) => eachComment !== comment.comment_id
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCommentEdit = (event) => {
    setEditedComment(event.target.value);
  };

  const editComment = (event) => {
    event.preventDefault();
    patchCommentBody(comment.comment_id, currentUser.username, editedComment)
      .then((response) => {
        setEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <li>
      <p>
        <strong>{comment.author} </strong>
        <i>{comment.created_at.substring(0, 9)} </i>
        {currentUser.username === comment.author ? (
          <>
            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={handleDeletion}>Delete</button>
          </>
        ) : null}
      </p>
      {edit ? (
        <>
          <form onSubmit={editComment}>
            <input
              type="text"
              id="edited-comment"
              value={editedComment}
              onChange={handleCommentEdit}
            />
            <button type="submit">Update</button>
          </form>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </>
      ) : (
        <p>{comment.body}</p>
      )}
      <p className="comment-votes">
        {commentVotes}{" "}
        <button
          className={commentVotesClick.length % 2 ? "voted" : "unvoted"}
          onClick={handleCommentVotes}
        >
          Agreed!
        </button>
      </p>
    </li>
  );
}
