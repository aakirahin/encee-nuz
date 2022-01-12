import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../utils";
import Filter from "./Filter";
import TopicsSideBar from "./TopicsSideBar";
import BackLink from "./BackLink";
import ScrollToTop from "./ScrollToTop";

export default function MasterPage({
  isLoading,
  setIsLoading,
  topicsList,
  topic,
  setTopic,
  filterQueries,
  setFilterQueries,
  resetTopic,
}) {
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(
      filterQueries.topic,
      filterQueries.sort_by,
      filterQueries.order
    )
      .then((response) => {
        setIsLoading(false);
        setArticlesList(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="articles">
      {topic.slug === "" ? (
        <h2>Articles</h2>
      ) : (
        <>
          <h2>{topic.slug}</h2> <h3>{topic.description}</h3>
          <BackLink resetTopic={resetTopic} />
          <Filter
            filterQueries={filterQueries}
            setFilterQueries={setFilterQueries}
            setArticlesList={setArticlesList}
          />
        </>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {articlesList.map((article) => {
            return (
              <li>
                <Link to={`/articles/${article.article_id}`}>
                  <p>{article.title}</p>
                </Link>
                <p>
                  {article.author}, {article.created_at.substring(0, 9)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
      <TopicsSideBar
        topicsList={topicsList}
        setTopic={setTopic}
        filterQueries={filterQueries}
        setFilterQueries={setFilterQueries}
      />
      <ScrollToTop />
    </div>
  );
}
