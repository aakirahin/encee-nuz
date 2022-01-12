import React from "react";
import { useNavigate } from "react-router";

export default function TopicLink({
  topic,
  setTopic,
  filterQueries,
  setFilterQueries,
}) {
  let navigate = useNavigate();

  const selectTopic = (event) => {
    event.preventDefault();
    setTopic(topic);
    setTopic({
      ...topic,
      slug: topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1),
    });
    setFilterQueries({ ...filterQueries, topic: topic.slug });
    navigate("/");
  };

  return (
    <a href="" onClick={selectTopic}>
      <li>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</li>
    </a>
  );
}
