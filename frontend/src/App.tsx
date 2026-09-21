import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultsGrid from "./views/ResultsGrid";
import "./index.css";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [hasSearched, setHasSearched] = useState(false);
  const [userQuery, setUserQuery] = useState("");

  const executeSearch = async (searchQuery: string) => {
    setHasSearched(true);
    setUserQuery(searchQuery);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col bg-base">
        <header
          className={`relative flex w-full justify-center transition-all duration-700 ease-in-out ${
            hasSearched
              ? "sticky top-0 z-100 border-content-muted bg-surface py-2 shadow-sm"
              : "bg-transparent pt-[45vh]"
          }`}
        >
          {/* Website Logo*/}
          <h1
            className={`absolute whitespace-nowrap font-bold text-primary transition-all duration-700 ease-in-out ${
              hasSearched
                ? "left-8 top-1/2 -translate-y-1/2 translate-x-0 text-2xl"
                : "left-1/2 top-[35vh] -translate-x-1/2 translate-y-0 text-5xl tracking-tight"
            }`}
          >
            <a href="/">NewsIntelligence</a>
          </h1>

          {/* Search Bar */}
          <div
            className={`w-full px-6 transition-all duration-700 ease-in-out ${hasSearched ? "max-w-4xl" : "max-w-3xl"}`}
          >
            <SearchBar onSearch={executeSearch} />
          </div>
        </header>

        {/* Dark Mode Toggle */}
        <div
          className={`fixed right-6 z-100 transition-all duration-700 ease-in-out ${
            hasSearched ? "top-4" : "top-[calc(100dvh-5rem)]" // Push to bottom of screen
          }`}
        >
          <DarkModeToggle />
        </div>

        {/* Search Results */}
        {hasSearched && (
          <main className="w-full grow p-8">
            <ResultsGrid query={userQuery} />
          </main>
        )}

        <footer className="sticky mt-auto bottom-0 flex bg-base text-sm text-content pl-5 border border-content-muted">
          &copy; Myles Swamy 2026
        </footer>
      </main>
    </>
  );
}

export default App;
