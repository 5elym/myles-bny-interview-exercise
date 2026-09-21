import type { SearchFilters } from "../hooks/useSearch";
import type { Article } from "../models/Article";

const BASE_API_URL = "http://localhost:8080";

export const fetchArticlesByQuery = async (query: string, page: number, filters: SearchFilters): Promise<Article[]> => {
  // Convert separate params into one single object
  const params: Record<string, string> = {
    query: query,
    page: page.toString(),
  };
  if (filters.provider && filters.provider !== "all") {
    params.provider = filters.provider;
  }
  if (filters.category && filters.category !== "all") {
    params.category = filters.category;
  }
  if (filters.fromDate) {
    params.fromDate = filters.fromDate;
  }
  if (filters.toDate) {
    params.toDate = filters.toDate;
  }

  const paramString = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${BASE_API_URL}/search?${paramString}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

export const fetchProviderNames = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/search/providers`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
