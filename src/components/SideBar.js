import { Link } from "react-router-dom";
import { useState } from "react";
import { useCurrentUser } from "../context/UserContext";
import TopicLink from "./TopicLink";
import SearchBar from "./SearchBar";

export default function SideBar({
  topicsList,
  setTopic,
  filterQueries,
  setFilterQueries,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser, loggedIn, logOut } = useCurrentUser();

  return (
    <div id="sidebar">
      {loggedIn ? (
        <div className="sidebar-profile">
          <Link to={`/profile/${currentUser.username}`}>
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
        <div id="user-options">
          <Link to="/login">
            <p>Sign In</p>
          </Link>
          <Link to="/register">
            <p>Sign Up</p>
          </Link>
        </div>
      )}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterQueries={filterQueries}
        setFilterQueries={setFilterQueries}
      />
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
                setSearchTerm={setSearchTerm}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
