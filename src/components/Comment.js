import React from "react";
import { useState } from "react/cjs/react.development";
import { patchCommentVotes } from "../utils";

export default function Comment({ comment }) {
  const [commentVotes, setCommentVotes] = useState(comment.votes);
  const [commentVotesClick, setCommentVotesClick] = useState([]);

  const handleCommentVotes = () => {
    let inc_vote = 1;
    if (commentVotesClick.length % 2) {
      inc_vote = -1;
    }
    setCommentVotes((currentVotes) => currentVotes + inc_vote);
    // need username to patch
    patchCommentVotes(comment.comment_id, inc_vote).catch((err) => {
      console.log(err);
      setCommentVotesClick((currentClicks) => {
        currentClicks.pop();
        return currentClicks;
      });
      setCommentVotes((currentVotes) => currentVotes - inc_vote);
    });
    setCommentVotesClick([...commentVotesClick, "clicked"]);
  };

  return (
    <li>
      <p>
        <strong>{comment.author}</strong> {comment.created_at.substring(0, 9)}
      </p>
      <p>{comment.body}</p>
      <p>
        {commentVotes} <button onClick={handleCommentVotes}>Agreed!</button>
      </p>
    </li>
  );
}
