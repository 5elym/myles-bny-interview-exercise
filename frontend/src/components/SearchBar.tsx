import { useState } from "react";

// Pass a function as a prop so the SearchBar can tell App.tsx when a search happens
export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      onSearch(text);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full items-center rounded-full border border-content-muted bg-base p-1 shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-primary"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
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
  );
}
