import { useState } from "react";
import SearchBar from "./components/SearchBar";
import type { Article } from "./models/Article";
import ResultsGrid from "./views/ResultsGrid";
import "./index.css";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  // const dummyArticle: Article = {
  //   title: "Doctor Who set to return in 2028 after being put out to tender!",
  //   summary:
  //     "The BBC has announced that Doctor Who will return in 2028 after being put out to tender. The show will be produced by a new production company, and the BBC is looking for a new showrunner to take over the series. Fans of the show are excited to see what the future holds for the Doctor and their companions.",
  //   url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
  //   imageUrl:
  //     "https://easydrawingguides.com/wp-content/uploads/2017/04/how-to-draw-a-cartoon-tree-featured-image-1200.png",
  //   publicationDate: new Date("2026-09-19"),
  //   source: "Screen Rant",
  // };

  const [hasSearched, setHasSearched] = useState(false);
  const [userQuery, setUserQuery] = useState("");

  const executeSearch = async (searchQuery: string) => {
    setHasSearched(true);
    setUserQuery(searchQuery);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-base">
        <header
          className={`relative flex w-full justify-center transition-all duration-700 ease-in-out ${
            hasSearched ? "border-content-muted bg-surface py-5 shadow-sm" : "bg-transparent pt-[45vh]"
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

          {/* Dark Mode Toggle */}
          <div
            className={`absolute right-8 top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${
              hasSearched ? "opacity-100" : "opacity-0"
            }`}
          >
            <DarkModeToggle />
          </div>
        </header>

        {/* Search Results */}
        {hasSearched && (
          <main className="w-full grow p-8">
            <ResultsGrid query={userQuery} />
          </main>
        )}
      </div>
    </>
  );
}

export default App;
