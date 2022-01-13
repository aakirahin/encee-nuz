import React from "react";
import BackLink from "./BackLink";
import { useCurrentUser } from "../context/UserContext";

export default function Profile({ resetTopic }) {
  const { currentUser } = useCurrentUser();

  return (
    <div>
      <BackLink resetTopic={resetTopic} />
      <h2>Your profile</h2>
    </div>
  );
}
