import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../utils";
import Filter from "./Filter";
import SideBar from "./SideBar";
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
  const [articlesError, setArticlesError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    fetchArticles(
      filterQueries.topic,
      filterQueries.sort_by,
      filterQueries.order,
      filterQueries.title
    )
      .then((response) => {
        setIsLoading(false);
        setArticlesList(response);
      })
      .catch((err) => {
        setArticlesError(true);
      });
  }, [filterQueries]);

  return (
    <div id="articles">
      <SideBar
        topicsList={topicsList}
        setTopic={setTopic}
        filterQueries={filterQueries}
        setFilterQueries={setFilterQueries}
      />
      {topic.slug === "" ? (
        <h2>Articles</h2>
      ) : (
        <>
          <h2 id="topic-name">{topic.slug}</h2>{" "}
          <h3 id="topic-description">{topic.description}</h3>
          <BackLink resetTopic={resetTopic} />
          <Filter
            filterQueries={filterQueries}
            setFilterQueries={setFilterQueries}
            setArticlesList={setArticlesList}
            setIsLoading={setIsLoading}
          />
        </>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul id="articles-list">
          {articlesList.map((article) => {
            return (
              <li key={article.article_id}>
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
      {articlesError && <p>Could not load articles.</p>}
      <ScrollToTop />
    </div>
  );
}
