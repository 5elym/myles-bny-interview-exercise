import type { Article } from "./models/Article";
import ResultsGrid from "./views/ResultsGrid";

function App() {
  const dummyArticle: Article = {
    title: "Doctor Who set to return in 2028 after being put out to tender!",
    summary:
      "The BBC has announced that Doctor Who will return in 2028 after being put out to tender. The show will be produced by a new production company, and the BBC is looking for a new showrunner to take over the series. Fans of the show are excited to see what the future holds for the Doctor and their companions.",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl:
      "https://easydrawingguides.com/wp-content/uploads/2017/04/how-to-draw-a-cartoon-tree-featured-image-1200.png",
    publicationDate: new Date("2026-09-19"),
    source: "Screen Rant",
  };

  return (
    <>
      <ResultsGrid query={'"stargate sg1"'} /> {/* Default value for now */}
    </>
  );
}

export default App;
