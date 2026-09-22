import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";

interface SearchHistoryPanelProps {
  history: string[];
  onSelect: (query: string) => void;
  onDelete: (index: number) => void;
}

export default function SearchHistoryPanel({ history, onSelect, onDelete }: SearchHistoryPanelProps) {
  return (
    <>
      <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-content-muted/20 bg-surface shadow-xl">
        <ul className="flex flex-col py-2">
          <li className="px-4 py-2 text-xs font-semibold tracking-wider text-content-muted">RECENT</li>

          {history.map((item, index) => (
            <li
              key={item + index}
              className="flex cursor-pointer items-center gap-3 px-4 py-3 text-content transition-colors hover:bg-base"
              onMouseDown={(e) => {
                onSelect(item);
              }}
            >
              <span className="truncate">{item}</span>
              <XMarkIcon
                className="ml-auto h-6 w-6 text-content-muted"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onDelete(index);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
