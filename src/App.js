import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import ArticlePage from "./components/ArticlePage";
import MasterPage from "./components/MasterPage";
import { fetchTopics } from "./utils";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { UserProvider } from "./context/UserContext";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [topic, setTopic] = useState({ slug: "", description: "" });
  const [filterQueries, setFilterQueries] = useState({
    sort_by: "created_at",
    order: "desc",
    topic: "",
  });

  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

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
    <UserProvider>
      <div className="App">
        <header>
          <h1>NC News</h1>
          <p>Forward with the people</p>
          <time>{date}</time>
        </header>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MasterPage
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
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
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  topicsList={topicsList}
                  setTopic={setTopic}
                  filterQueries={filterQueries}
                  setFilterQueries={setFilterQueries}
                  resetTopic={resetTopic}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={<Profile resetTopic={resetTopic} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
