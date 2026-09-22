interface ArticleCardFooterProps {
  publicationDate: string;
  source: string;
}

export default function ArticleCardFooter({ publicationDate, source }: ArticleCardFooterProps) {
  return (
    <>
      <div className="mt-auto flex items-center justify-between border-t border-content-muted pt-2 text-xs font-semibold">
        <span className="text-content-muted">{new Date(publicationDate).toDateString()}</span>
        <span className="text-primary font-bold">{source}</span>
      </div>
    </>
  );
}
