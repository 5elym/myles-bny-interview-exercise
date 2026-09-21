import { useEffect, useState } from "react";
import type { Article } from "../models/Article";
import { fetchArticlesByQuery } from "../services/SearchService";
import ArticleCard from "../components/ArticleCard";

// Heroicons
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface resultsGridProps {
  query?: string;
}

export default function ResultsGrid({ query }: resultsGridProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // For testing to extract query params
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("q") || query || "doctor who"; // default

  useEffect(() => {
    setPage(1);
    setHasMoreArticles(true);
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        setArticles([]); // Reset
        const results = await fetchArticlesByQuery('"' + searchQuery + '"', 1);
        setArticles(results);
      } catch (error) {
        // TODO: Show error to UI probably later
        console.error("Failed to load articles", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, [query]);

  const handleLoadMore = async () => {
    if (isLoading || !hasMoreArticles) return; // Prevent user from spamming api

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const newArticles = await fetchArticlesByQuery('"' + searchQuery + '"', nextPage);

      if (newArticles.length === 0) {
        setHasMoreArticles(false);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more articles", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="p-8 bg-base min-h-screen">
        <h1 className="text-center text-2xl font-bold text-content-muted mb-8">
          {articles.length > 0 ? (
            "Showing results for: " + searchQuery
          ) : isLoading ? (
            "Searching sources..."
          ) : (
            <>
              <ExclamationCircleIcon className="mx-auto h-10 w-10" />
              <br />
              {"No Results Found for: " + searchQuery}
            </>
          )}
        </h1>

        {/* Main grid layout */}
        <div className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-[repeat(2,320px)] lg:grid-cols-[repeat(4,320px)]">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>

        {hasMoreArticles && articles.length > 0 && (
          <div className="mt-12 flex justify-center pb-8">
            <button
              type="submit"
              className="mx-auto block rounded-full hover:cursor-pointer bg-primary px-6 py-2 font-semibold text-white transition-colors hover:bg-primary-hover"
              onClick={handleLoadMore}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </main>
    </>
  );
}
