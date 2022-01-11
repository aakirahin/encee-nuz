import React from "react";

export default function ArticleCard({ article }) {
  return (
    <li>
      <p>{article.title}</p>
      <p>
        {article.author}, {article.created_at.substring(0, 9)}
      </p>
    </li>
  );
}
