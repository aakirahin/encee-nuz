import React from "react";
import BackLink from "./BackLink";
import SideBar from "./SideBar";

export default function InvalidPath({
  topicsList,
  setTopic,
  filterQueries,
  setFilterQueries,
  resetTopic,
}) {
  return (
    <div>
      <SideBar
        topicsList={topicsList}
        setTopic={setTopic}
        filterQueries={filterQueries}
        setFilterQueries={setFilterQueries}
      />
      <BackLink resetTopic={resetTopic} />
      <h1>404: Not Found</h1>
    </div>
  );
}
