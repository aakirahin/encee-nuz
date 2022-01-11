import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import ArticlePage from "./components/ArticlePage";
import MasterPage from "./components/MasterPage";
import { fetchTopics } from "./utils";
import Login from "./components/Login";

function App() {
  const [topicsList, setTopicsList] = useState([]);
  const [topic, setTopic] = useState({ slug: "", description: "" });
  const [filterQueries, setFilterQueries] = useState({
    sort_by: "created_at",
    order: "desc",
    topic: "",
  });
  const [currentUser, setCurrentUser] = useState({
    username: "",
    avatar: "",
    name: "",
  });

  useEffect(() => {
    fetchTopics()
      .then((response) => {
        setTopicsList(response);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const resetTopic = () => {
    setTopic({ slug: "", description: "" });
    setFilterQueries({ ...filterQueries, topic: "" });
  };

  return (
    <div className="App">
      <h1>nc-news</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MasterPage
                topicsList={topicsList}
                topic={topic}
                setTopic={setTopic}
                filterQueries={filterQueries}
                setFilterQueries={setFilterQueries}
                resetTopic={resetTopic}
              />
            }
          />
          <Route
            path="/articles/:articleID"
            element={
              <ArticlePage
                topicsList={topicsList}
                setTopic={setTopic}
                filterQueries={filterQueries}
                setFilterQueries={setFilterQueries}
                resetTopic={resetTopic}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
