import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  fetchArticleByID,
  fetchArticleComments,
  patchArticleBody,
  patchArticleVotes,
} from "../utils";
import Comment from "./Comment";
import SideBar from "./SideBar";
import BackLink from "./BackLink";
import ScrollToTop from "./ScrollToTop";
import { useCurrentUser } from "../context/UserContext";
import NewComment from "./NewComment";

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
  const [commentsError, setCommentsError] = useState(false);
  const [commentsChange, setCommentsChange] = useState(false);
  const [editArticle, setEditArticle] = useState(false);
  const [editedArticle, setEditedArticle] = useState("");
  const [editError, setEditError] = useState(false);
  const { loggedIn, currentUser } = useCurrentUser();
  let navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchArticleByID(articleID)
      .then((response) => {
        setArticle(response);
        setArticleDate(response.created_at.substring(0, 9));
        setArticleVotes(response.votes);
        setEditedArticle(response.body);
        setIsLoading(false);
      })
      .catch((err) => {
        navigate("*");
      });
    fetchArticleComments(articleID)
      .then((response) => {
        setComments(response);
      })
      .catch((err) => {
        setCommentsError(true);
      });
  }, [commentsChange === true]);

  const handleArticleVotes = () => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    let inc_vote = 1;
    if (articleVotesClick.length % 2) {
      inc_vote = -1;
    }
    setArticleVotes((currentVotes) => currentVotes + inc_vote);
    patchArticleVotes(articleID, inc_vote).catch((err) => {
      setArticleVotesClick((currentClicks) => {
        currentClicks.pop();
        return currentClicks;
      });
      setArticleVotes((currentVotes) => currentVotes - inc_vote);
    });
    setArticleVotesClick([...articleVotesClick, "clicked"]);
  };

  const handleArticleEdit = (event) => {
    setEditedArticle(event.target.value);
  };

  const submitArticleEdit = (event) => {
    event.preventDefault();
    patchArticleBody(articleID, editedArticle)
      .then((response) => {
        setEditArticle(false);
      })
      .catch((err) => {
        setEditError(true);
      });
  };

  return (
    <div>
      <SideBar
        topicsList={topicsList}
        setTopic={setTopic}
        filterQueries={filterQueries}
        setFilterQueries={setFilterQueries}
      />
      <BackLink resetTopic={resetTopic} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="article">
          <h2>{article.title}</h2>
          <h3>
            {article.author}, {articleDate}
          </h3>
          {currentUser.username === article.author ? (
            <button
              id="edit-article"
              onClick={() => setEditArticle(true)}
              disabled={editArticle}
            >
              Edit
            </button>
          ) : null}
          {editArticle ? (
            <>
              <form onSubmit={submitArticleEdit}>
                <textarea
                  type="text"
                  id="edited-article"
                  value={editedArticle}
                  onChange={handleArticleEdit}
                />
                <button id="update-article" type="submit">
                  Update
                </button>
              </form>
              <button id="cancel-edit" onClick={() => setEditArticle(false)}>
                Cancel
              </button>
            </>
          ) : (
            <p>{article.body}</p>
          )}
          {editError && <p>Could not update article.</p>}
          <div className="article-votes">
            <strong>{articleVotes} </strong>
            <button
              className={articleVotesClick.length % 2 ? "voted" : "unvoted"}
              onClick={handleArticleVotes}
            >
              Nice!
            </button>
          </div>
          <ul className="comments-section">
            <h3>Comments • {article.comment_count}</h3>
            <NewComment
              articleID={articleID}
              setCommentsChange={setCommentsChange}
            />
            {commentsError ? (
              <p>Could not load comments.</p>
            ) : (
              comments.map((comment, index) => {
                return (
                  <Comment
                    comment={comment}
                    comments={comments}
                    setComments={setComments}
                    index={index}
                  />
                );
              })
            )}
          </ul>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
}
