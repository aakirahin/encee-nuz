import React from "react";
import { Link } from "react-router-dom";

export default function TopicLink({
  topic,
  setTopic,
  filterQueries,
  setFilterQueries,
  setSearchTerm,
}) {
  const selectTopic = (event) => {
    event.preventDefault();
    setTopic(topic);
    setTopic({
      ...topic,
      slug: topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1),
    });
    setFilterQueries({ ...filterQueries, topic: topic.slug, title: "" });
    setSearchTerm("");
  };

  return (
    <Link to="/" onClick={selectTopic}>
      {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
    </Link>
  );
}
