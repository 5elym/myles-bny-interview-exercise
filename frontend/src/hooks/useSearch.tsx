import { useState } from "react";
import type { Article } from "../models/Article";
import { fetchArticlesByQuery } from "../services/SearchService";
//import type { SearchFilters } from "../App"; // Or move SearchFilters to a types file

export interface SearchFilters {
  provider?: string;
  category?: string;
  fromDate?: string;
  toDate?: string;
}

export function useSearch() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);

  const [currentQuery, setCurrentQuery] = useState("");
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});

  const search = async (searchQuery: string, filters: SearchFilters) => {
    setIsLoading(true);
    setArticles([]);
    setPage(1);
    setHasMoreArticles(true);

    setCurrentQuery(searchQuery);
    setCurrentFilters(filters);

    try {
      const results = await fetchArticlesByQuery('"' + searchQuery + '"', 1, filters);
      setArticles(results);
      if (results.length === 0) {
        setHasMoreArticles(false);
      }
    } catch (error) {
      console.error("Failed to load articles", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (isLoading || !hasMoreArticles) return;

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const newArticles = await fetchArticlesByQuery('"' + currentQuery + '"', nextPage, currentFilters);

      if (newArticles.length === 0) {
        setHasMoreArticles(false);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more articles", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    articles,
    isLoading,
    hasMoreArticles,
    currentQuery,
    search,
    loadMore,
  };
}
