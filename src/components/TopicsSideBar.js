import TopicLink from "./TopicLink";

export default function TopicsSideBar({
  topicsList,
  setTopic,
  filterQueries,
  setFilterQueries,
}) {
  return (
    <div>
      <h3>Topics</h3>
      <ul>
        {topicsList.map((topic) => {
          return (
            <TopicLink
              topic={topic}
              setTopic={setTopic}
              filterQueries={filterQueries}
              setFilterQueries={setFilterQueries}
            />
          );
        })}
      </ul>
    </div>
  );
}
