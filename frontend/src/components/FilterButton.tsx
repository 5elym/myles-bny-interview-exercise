import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

interface FilterButtonProps {
  isMenuOpen: boolean;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterButton({ isMenuOpen, showFilters, setShowFilters }: FilterButtonProps) {
  return (
    <>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${isMenuOpen || showFilters ? "w-12 ml-2 opacity-100" : "w-0 ml-0 opacity-0"}`}
      >
        <button
          type="button"
          onMouseDown={(e) => {
            setShowFilters((prev) => !prev);
          }}
          className="flex h-10 w-10 shrink-0 hover:cursor-pointer items-center justify-center rounded-full border border-content-muted/20 bg-base text-content hover:bg-content/5"
        >
          <AdjustmentsHorizontalIcon className="h-7 w-7 fill-primary" />
        </button>
      </div>
    </>
  );
}
