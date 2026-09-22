import { useState } from "react";
import { CacheManager } from "../utils/CacheManager";
import FilterPanel from "./FilterPanel";

import type { SearchFilters } from "../hooks/useSearch";
import SearchHistoryPanel from "./SearchHistoryPanel";
import SearchButton from "./SearchButton";
import FilterButton from "./FilterButton";

export default function SearchBar({ onSearch }: { onSearch: (query: string, filters: SearchFilters) => void }) {
  const [text, setText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const savedHistory = CacheManager.getArray("searchHistory");
    return savedHistory ? savedHistory : [];
  });

  const [filters, setFilters] = useState<SearchFilters>({
    provider: "all",
    category: "all",
    fromDate: "",
    toDate: "",
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      onSearch(text, filters);
      saveSearchHistory(text);
      setIsMenuOpen(false);

      // Unfocus search bar
      if (document.activeElement instanceof HTMLFormElement) {
        document.activeElement.blur();
      }
    }
  };

  const saveSearchHistory = (query: string) => {
    setSearchHistory((prevHistory) => {
      // Remove duplicates and add the new search to the top
      const updatedHistory = [query, ...prevHistory.filter((item) => item !== query)];
      const finalHistory = updatedHistory.slice(0, 5); // Keep only the last 5 searches

      CacheManager.saveArray("searchHistory", finalHistory);

      return finalHistory;
    });
  };

  const deleteSearchHistoryItem = (index: number) => {
    setSearchHistory((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      CacheManager.saveArray("searchHistory", updated);

      return updated;
    });
  };

  const handleHistoryClick = (recentSearch: string) => {
    setText(recentSearch);
    onSearch(recentSearch, filters);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="relative w-full">
        <form
          onSubmit={handleSubmit}
          className="relative flex w-full items-center rounded-full border border-content-muted bg-base p-1 shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-primary"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsMenuOpen(true)}
            onBlur={() => setIsMenuOpen(false)}
            maxLength={100}
            placeholder="Search the latest news..."
            className="w-full rounded-full bg-transparent py-3 pl-6 pr-28 text-content outline-none"
          />

          {/* Wrapper for both buttons */}
          <div className="flex items-center">
            <SearchButton />
            <FilterButton isMenuOpen={isMenuOpen} showFilters={showFilters} setShowFilters={setShowFilters} />
          </div>
        </form>

        {showFilters && <FilterPanel filters={filters} setFilters={setFilters} />}

        {isMenuOpen && searchHistory.length > 0 && (
          <SearchHistoryPanel
            history={searchHistory}
            onSelect={handleHistoryClick}
            onDelete={deleteSearchHistoryItem}
          />
        )}
      </div>
    </>
  );
}
