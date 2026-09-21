import { useEffect, useState, type Key } from "react";
import type { Article } from "../models/Article";
import { fetchArticlesByQuery } from "../services/SearchService";
import ArticleCard from "../components/ArticleCard";

// Heroicons
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface ResultsGridProps {
  currentQuery: string;
  articles: Article[];
  isLoading: boolean;
  hasMoreArticles: boolean;
  loadMore: () => void;
}

export default function ResultsGrid({
  currentQuery,
  articles,
  isLoading,
  hasMoreArticles,
  loadMore,
}: ResultsGridProps) {
  const [page, setPage] = useState(1);

  // For testing to extract query params
  // const urlParams = new URLSearchParams(window.location.search);
  // const searchQuery = urlParams.get("q") || query || "doctor who"; // default

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-content-muted mb-8">
        {articles.length > 0 ? (
          "Showing results for: " + currentQuery
        ) : isLoading ? (
          "Searching sources..."
        ) : (
          <>
            <ExclamationCircleIcon className="mx-auto h-10 w-10" />
            <br />
            {"No Results Found for: " + currentQuery}
          </>
        )}
      </h1>

      {/* Main grid layout */}
      <div className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-[repeat(2,320px)] lg:grid-cols-[repeat(4,320px)]">
        {articles.map((article: Article, index: Key | null | undefined) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>

      {hasMoreArticles && articles.length > 0 && (
        <div className="mt-12 flex justify-center pb-8">
          <button
            type="submit"
            className="mx-auto block rounded-full hover:cursor-pointer bg-primary px-6 py-2 font-semibold text-white transition-colors hover:bg-primary-hover"
            onClick={loadMore}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
