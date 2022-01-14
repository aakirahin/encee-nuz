import React, { useEffect, useState } from "react";
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
        <label for="sort_by-query">Sort by: </label>
        <select name="sort_by" id="sort_by-query">
          <option value="created_at" selected>
            Publish date
          </option>
          <option value="votes">Popularity</option>
        </select>
      </form>
      <form onChange={handleOrder}>
        <label for="order-query">In this order: </label>
        <select name="order" id="order-query">
          <option value="asc">Ascending</option>
          <option value="desc" selected>
            Descending
          </option>
        </select>
      </form>
    </div>
  );
}
