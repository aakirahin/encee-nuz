import axios from "axios";

const myApi = axios.create({
  baseURL: "https://ncnews.herokuapp.com/api",
});

export const fetchArticleByID = (articleID) => {
  return myApi.get(`/articles/${articleID}`).then((res) => {
    return res.data.article;
  });
};

export const fetchTopics = () => {
  return myApi.get(`/topics`).then((res) => {
    return res.data.topics;
  });
};

export const fetchArticles = (
  slug = "",
  sort_by = "created_at",
  order = "desc"
) => {
  return myApi
    .get(`/articles?sort_by=${sort_by}&order=${order}&topic=${slug}`)
    .then((res) => {
      return res.data.articles;
    });
};

export const fetchArticleComments = (articleID) => {
  return myApi.get(`/articles/${articleID}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const fetchUser = (username) => {
  return myApi.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const patchArticleVotes = (articleID, vote) => {
  return myApi.patch(`/articles/${articleID}`, { inc_votes: vote });
};

export const patchCommentVotes = (commentID, username, vote) => {
  return myApi.patch(`/comments/${commentID}`, {
    username: username,
    inc_votes: vote,
  });
};
