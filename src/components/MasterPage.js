import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../utils";
import ArticleCard from "./ArticleCard";
import Filter from "./Filter";
import TopicsSideBar from "./TopicsSideBar";

export default function MasterPage({
  topicsList,
  topic,
  setTopic,
  filterQueries,
  setFilterQueries,
  resetTopic,
}) {
  const [isLoading, setIsLoading] = useState(false);
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
    <div>
      {topic.slug === "" ? (
        <h2>Articles</h2>
      ) : (
        <>
          <h2>{topic.slug}</h2> <h3>{topic.description}</h3>
          <Link to="/" onClick={resetTopic}>
            Back
          </Link>
          <Filter
            filterQueries={filterQueries}
            setFilterQueries={setFilterQueries}
            setArticlesList={setArticlesList}
          />
        </>
      )}
      {isLoading ? (
        "Loading..."
      ) : (
        <ul>
          {articlesList.map((article) => {
            return (
              <Link to={`/articles/${article.article_id}`}>
                <ArticleCard article={article} />
              </Link>
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
    </div>
  );
}
