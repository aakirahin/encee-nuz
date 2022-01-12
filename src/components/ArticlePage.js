import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  fetchArticleByID,
  fetchArticleComments,
  patchArticleVotes,
} from "../utils";
import Comment from "./Comment";
import TopicsSideBar from "./TopicsSideBar";
import BackLink from "./BackLink";
import ScrollToTop from "./ScrollToTop";

export default function ArticlePage({
  isLoading,
  setIsLoading,
  topicsList,
  setTopic,
  filterQueries,
  setFilterQueries,
  resetTopic,
}) {
  const { articleID } = useParams();
  const [article, setArticle] = useState({});
  const [articleDate, setArticleDate] = useState();
  const [articleVotes, setArticleVotes] = useState(0);
  const [articleVotesClick, setArticleVotesClick] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleByID(articleID)
      .then((response) => {
        setArticle(response);
        setArticleDate(response.created_at.substring(0, 9));
        setArticleVotes(response.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchArticleComments(articleID)
      .then((response) => {
        setComments(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleArticleVotes = () => {
    let inc_vote = 1;
    if (articleVotesClick.length % 2) {
      inc_vote = -1;
    }
    setArticleVotes((currentVotes) => currentVotes + inc_vote);
    patchArticleVotes(articleID, inc_vote).catch((err) => {
      console.log(err);
      setArticleVotesClick((currentClicks) => {
        currentClicks.pop();
        return currentClicks;
      });
      setArticleVotes((currentVotes) => currentVotes - inc_vote);
    });
    setArticleVotesClick([...articleVotesClick, "clicked"]);
  };

  return (
    <div>
      <BackLink resetTopic={resetTopic} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="article">
          <h2>{article.title}</h2>
          <h3>
            {article.author}, {articleDate}
          </h3>
          <p>{article.body}</p>
          <button onClick={handleArticleVotes}>{articleVotes} votes</button>
          <ul className="comments-section">
            <h3>Comments • {article.comment_count}</h3>
            {comments.map((comment) => {
              return <Comment comment={comment} />;
            })}
          </ul>
        </div>
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
