import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  fetchArticleByID,
  fetchArticleComments,
  patchArticleVotes,
} from "../utils";
import Comment from "./Comment";
import TopicsSideBar from "./TopicsSideBar";

export default function ArticlePage({
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
    fetchArticleByID(articleID)
      .then((response) => {
        setArticle(response);
        setArticleDate(response.created_at.substring(0, 9));
        setArticleVotes(response.votes);
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
      <Link to="/" onClick={resetTopic}>
        Back
      </Link>
      <h2>{article.title}</h2>
      <h3>
        {article.author}, {articleDate}
      </h3>
      <p>{article.body}</p>
      <button onClick={handleArticleVotes}>{articleVotes} votes</button>
      <h3>Comments • {article.comment_count}</h3>
      <ul>
        {comments.map((comment) => {
          return <Comment comment={comment} />;
        })}
      </ul>
      <TopicsSideBar
        topicsList={topicsList}
        setTopic={setTopic}
        filterQueries={filterQueries}
        setFilterQueries={setFilterQueries}
      />
    </div>
  );
}
