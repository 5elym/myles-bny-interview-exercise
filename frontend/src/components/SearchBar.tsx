import { useState } from "react";
import { CacheManager } from "../utils/CacheManager";
import FilterPanel from "./FilterPanel";

// Heroicons
import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import type { SearchFilters } from "../hooks/useSearch";

export default function SearchBar({ onSearch }: { onSearch: (query: string, filters: SearchFilters) => void }) {
  const [text, setText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const savedHistory = CacheManager.getArray("searchHistory");
    return savedHistory ? savedHistory : [];
  });

  const [filters, setFilters] = useState<SearchFilters>({});

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
          <button
            type="submit"
            className="flex h-10 items-center justify-center rounded-full hover:cursor-pointer bg-primary px-2 py-2 font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            <MagnifyingGlassIcon className="h-7 w-7" />
          </button>

          {/* Specific wrapper for filter button */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${isMenuOpen || showFilters ? "w-12 ml-2 opacity-100" : "w-0 ml-0 opacity-0"}`}
          >
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setShowFilters((prev) => !prev);
              }}
              className="flex h-10 w-10 shrink-0 hover:cursor-pointer items-center justify-center rounded-full border border-content-muted/20 bg-base text-content hover:bg-content/5"
            >
              <AdjustmentsHorizontalIcon className="h-7 w-7 fill-primary" />
            </button>
          </div>
        </div>
      </form>

      {showFilters && <FilterPanel filters={filters} setFilters={setFilters} />}

      {/* TODO: Make search history panel a component later */}
      {isMenuOpen && searchHistory.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-content-muted/20 bg-surface shadow-xl">
          <ul className="flex flex-col py-2">
            <li className="px-4 py-2 text-xs font-semibold tracking-wider text-content-muted">RECENT</li>

            {searchHistory.map((item, index) => (
              <li
                key={item + index}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 text-content transition-colors hover:bg-base"
                onMouseDown={(e) => {
                  handleHistoryClick(item);
                  setIsMenuOpen(false);
                }}
              >
                <span className="truncate">{item}</span>
                <XMarkIcon
                  className="ml-auto h-6 w-6 text-content-muted"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteSearchHistoryItem(index);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
