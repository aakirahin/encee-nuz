import React from "react";
import { Link } from "react-router-dom";

export default function TopicLink({
  topic,
  setTopic,
  filterQueries,
  setFilterQueries,
}) {
  const selectTopic = (event) => {
    event.preventDefault();
    setTopic(topic);
    setTopic({
      ...topic,
      slug: topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1),
    });
    setFilterQueries({ ...filterQueries, topic: topic.slug });
  };

  return (
    <Link to="/" onClick={selectTopic}>
      {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
    </Link>
  );
}
