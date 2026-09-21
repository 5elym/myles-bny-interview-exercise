import type { Article } from "../models/Article";

const BASE_API_URL = "http://localhost:8080";

export const fetchArticlesByQuery = async (query: string, page: number): Promise<Article[]> => {
  try {
    const response = await fetch(`${BASE_API_URL}/search?q=${encodeURIComponent(query)}&page=${page}`);

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
