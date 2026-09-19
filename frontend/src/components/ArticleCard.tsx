import type { Article } from "../models/Article";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>

      <img src={article.imageUrl} alt={article.title} />

      <p>{article.summary}</p>

      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
}
