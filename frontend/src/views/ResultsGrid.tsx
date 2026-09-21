import { useEffect, useState } from "react";
import type { Article } from "../models/Article";
import { fetchArticlesByQuery } from "../services/SearchService";
import ArticleCard from "../components/ArticleCard";

interface resultsGridProps {
  query?: string;
}

export default function ResultsGrid({ query }: resultsGridProps) {
  const [articles, setArticles] = useState<Article[]>([]);

  // For testing to extract query params
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("q") || query || "doctor who"; // default

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const results = await fetchArticlesByQuery('"' + searchQuery + '"');
        setArticles(results);
      } catch (err) {
        // TODO: Show error to UI probably later
      }
    };

    loadArticles();
  }, [query]);

  return (
    <>
      <main className="p-8 bg-base min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-content">Results for: {searchQuery}</h1>

        {/* Main grid layout */}
        <div className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-[repeat(2,320px)] lg:grid-cols-[repeat(4,320px)]">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </main>
    </>
  );
}
