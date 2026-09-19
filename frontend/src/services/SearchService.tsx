import type { Article } from "../models/Article";

const BASE_API_URL = "http://localhost:8080"; // Your backend port

export const fetchArticlesByQuery = async (query: string): Promise<Article[]> => {
  try {
    // Construct the full URL with the query parameter appended
    const response = await fetch(`${BASE_API_URL}/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
