import type { Article } from "../../models/Article";

// Heroicons
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import ArticleCardFooter from "./ArticleCardFooter";
import ArticleCardImage from "./ArticleCardImage";
import ArticleCardSummary from "./ArticleCardSummary";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <>
      <div className="group relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-xl border border-surface bg-white shadow-md">
        {/* Image takes up 2/3 of the card */}
        <ArticleCardImage imageUrl={article.imageUrl} title={article.title} />

        {/* Pushes children to the bottom */}
        <div className="absolute inset-0 flex flex-col justify-end">
          {/* Title overlayed on top of the image */}
          <div className="z-10 p-4 pb-2 shrink-0">
            <h2 className="line-clamp-3 text-xl font-bold leading-tight text-white drop-shadow-md">{article.title}</h2>
          </div>

          {/* White panel at bottom of card */}
          <div className="flex flex-col max-h-[70%] bg-surface px-4 py-3 pt-0 transition-all duration-500 ease-in-out group-hover:pt-4">
            {/* Summary expands on hover */}
            <ArticleCardSummary summary={article.summary} url={article.url} />
            <ArticleCardFooter
              publicationDate={new Date(article.publicationDate).toDateString()}
              source={article.source}
            />
          </div>
        </div>
      </div>
    </>
  );
}
