import { useState } from "react";

import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";

// Pass a function as a prop so the SearchBar can tell App.tsx when a search happens
export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [text, setText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dummy history for demonstration purposes
  const fakeHistory = ["Doctor Who", "No Man's Sky", "Climate Change", "1963"];

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      onSearch(text);
    }
  };

  const handleHistoryClick = (recentSearch: string) => {
    setText(recentSearch);
    onSearch(recentSearch);
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
          placeholder="Search the latest news..."
          className="w-full rounded-full bg-transparent py-3 pl-6 pr-28 text-content outline-none"
        />

        <button
          type="submit"
          className="absolute right-1.5 rounded-full bg-primary px-6 py-2 font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Search
        </button>
      </form>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-content-muted/20 bg-surface shadow-xl">
          <ul className="flex flex-col py-2">
            <li className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-content-muted">Recent</li>

            {fakeHistory.map((item, index) => (
              <li
                key={item + index}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 text-content transition-colors hover:bg-base"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleHistoryClick(item);
                }}
              >
                <span className="truncate">{item}</span>
                <XMarkIcon
                  className="ml-auto h-6 w-6 text-content-muted"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    fakeHistory.splice(index, 1);
                    setIsMenuOpen(true);
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
