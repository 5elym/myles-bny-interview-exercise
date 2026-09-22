import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

interface ArticleCardSummaryProps {
  summary: string;
  url: string;
}

export default function ArticleCardSummary({ summary, url }: ArticleCardSummaryProps) {
  return (
    <>
      <div className="flex-1 grid grid-rows-[0fr] min-h-0 transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden flex flex-col min-h-0">
          <div className="h-full flex flex-col pb-3 opacity-0 delay-100 transition-opacity duration-300 group-hover:opacity-100">
            <p className="mb-2 mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-white scrollbar-gutter-stable text-sm text-content">
              {summary}
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit text-sm font-semibold text-primary hover:text-primary-hover"
            >
              Read more <ArrowTopRightOnSquareIcon className="ml-1 mb-0.5 inline h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
