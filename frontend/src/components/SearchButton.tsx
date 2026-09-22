import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchButton() {
  return (
    <button
      type="submit"
      className="flex h-10 items-center justify-center rounded-full hover:cursor-pointer bg-primary px-2 py-2 font-semibold text-white transition-colors hover:bg-primary-hover"
    >
      <MagnifyingGlassIcon className="h-7 w-7" />
    </button>
  );
}
