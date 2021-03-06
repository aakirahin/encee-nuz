import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useCurrentUser } from "../context/UserContext";
import { patchCommentVotes, deleteComment, patchCommentBody } from "../utils";
import { Link } from "react-router-dom";

export default function Comment({
  comment,
  comments,
  setComments,
  setCommentsChange,
  index,
}) {
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
        setCommentVotesClick((currentClicks) => {
          currentClicks.pop();
          return currentClicks;
        });
        setCommentVotes((currentVotes) => currentVotes - inc_vote);
      }
    );
    setCommentVotesClick([...commentVotesClick, "clicked"]);
    console.log(commentVotesClick);
  };

  const handleDeletion = () => {
    deleteComment(comment.comment_id).then((response) => {
      setComments([...comments.slice(0, index), ...comments.slice(index + 1)]);
      setCommentsChange(true);
    });
  };

  const handleCommentEdit = (event) => {
    setEditedComment(event.target.value);
  };

  const editComment = (event) => {
    event.preventDefault();
    patchCommentBody(
      comment.comment_id,
      currentUser.username,
      editedComment
    ).then((response) => {
      setComments([
        ...comments.slice(0, index),
        response,
        ...comments.slice(index + 1),
      ]);
      setEdit(false);
      setCommentsChange(true);
    });
  };

  return (
    <div id="comment">
      <p>
        <Link to={`/profile/${comment.author}`}>{comment.author} </Link>
        <i>{comment.created_at.substring(0, 9)} </i>
        {currentUser.username === comment.author ? (
          <>
            <button
              id="edit-comment"
              onClick={() => setEdit(true)}
              disabled={edit}
            >
              Edit
            </button>
            <button id="delete-comment" onClick={handleDeletion}>
              Delete
            </button>
          </>
        ) : null}
      </p>
      {edit ? (
        <>
          <form onSubmit={editComment}>
            <textarea
              type="text"
              id="edited-comment"
              value={editedComment}
              onChange={handleCommentEdit}
            />
            <button id="update-comment" type="submit">
              Update
            </button>
          </form>
          <button id="cancel-comment" onClick={() => setEdit(false)}>
            Cancel
          </button>
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
    </div>
  );
}
