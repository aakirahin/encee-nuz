import React, { useEffect } from "react";
import { fetchArticles } from "../utils";

export default function Filter({
  filterQueries,
  setFilterQueries,
  setArticlesList,
  setIsLoading,
}) {
  const handleSortBy = (event) => {
    setFilterQueries({ ...filterQueries, sort_by: event.target.value });
  };

  const handleOrder = (event) => {
    setFilterQueries({ ...filterQueries, order: event.target.value });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(
      filterQueries.topic,
      filterQueries.sort_by,
      filterQueries.order
    ).then((response) => {
      setArticlesList(response);
      setIsLoading(false);
    });
  }, [filterQueries]);

  return (
    <div id="filter">
      <form onChange={handleSortBy}>
        <label className="sort_by-query">Sort by: </label>
        <select name="sort_by" id="sort_by-query" defaultValue={"created_at"}>
          <option value="created_at">Publish date</option>
          <option value="votes">Popularity</option>
        </select>
      </form>
      <form onChange={handleOrder}>
        <label className="order-query">In this order: </label>
        <select name="order" id="order-query" defaultValue={"desc"}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </form>
    </div>
  );
}
