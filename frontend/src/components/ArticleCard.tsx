import type { Article } from "../models/Article";

// Heroicons
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <>
      <div className="group relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
        {/* Thumbnail that takes up 2/3 of the card */}
        <img
          src={article.imageUrl || "https://via.placeholder.com/320?text=No+Image"}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Subtle gradient shadow to make title more readable */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500"></div>

        {/* Pushes children to the bottom */}
        <div className="absolute inset-0 flex flex-col justify-end">
          {/* Title overlayed on top of the image */}
          <div className="z-10 p-4 pb-2">
            <h2 className="line-clamp-3 text-xl font-bold leading-tight text-white drop-shadow-md">{article.title}</h2>
          </div>

          {/* White panel at bottom of card */}
          <div className="flex flex-col bg-white px-4 py-3 pt-0 transition-all duration-500 ease-in-out group-hover:pt-4">
            {/* Summary that expands on hover */}
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="flex flex-col pb-3 opacity-0 delay-100 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="mb-2 mt-2 line-clamp-4 text-sm text-gray-600">{article.summary}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-fit text-sm font-semibold text-sky-500 hover:text-sky-600"
                  >
                    Read more <ArrowTopRightOnSquareIcon className="ml-1 mb-0.5 inline h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer for the card */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-2 text-xs font-semibold">
              <span className="text-gray-400">{article.publicationDate.toDateString()}</span>
              <span className="text-sky-600">{article.source}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
