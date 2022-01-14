import { Link } from "react-router-dom";
import { useCurrentUser } from "../context/UserContext";
import TopicLink from "./TopicLink";

export default function SideBar({
  topicsList,
  setTopic,
  filterQueries,
  setFilterQueries,
}) {
  const { currentUser, loggedIn, logOut } = useCurrentUser();

  return (
    <div id="sidebar">
      {loggedIn ? (
        <div className="sidebar-profile">
          <Link to="/profile/">
            <img
              className="avatar"
              src={currentUser.avatar_url}
              alt="avatar"
              width="150"
            />
            <p>{currentUser.username}</p>
          </Link>
          <Link id="sign-out" to="/" onClick={logOut}>
            Sign out
          </Link>
        </div>
      ) : (
        <>
          <Link to="/login">
            <p>Sign In</p>
          </Link>
          <Link to="/register">
            <p>Sign Up</p>
          </Link>
        </>
      )}

      <h3>Topics</h3>
      <ul>
        {topicsList.map((topic, index) => {
          return (
            <li key={`${index}${topic.slug}`}>
              <TopicLink
                topic={topic}
                setTopic={setTopic}
                filterQueries={filterQueries}
                setFilterQueries={setFilterQueries}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
