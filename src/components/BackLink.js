import React from "react";
import { Link } from "react-router-dom";

export default function BackLink({ resetTopic }) {
  return (
    <div id="back">
      <Link to="/" onClick={resetTopic}>
        Back
      </Link>
    </div>
  );
}
