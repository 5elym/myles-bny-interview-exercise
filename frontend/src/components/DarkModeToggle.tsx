import { useEffect, useState } from "react";

// Heriocions
import MoonIcon from "@heroicons/react/24/solid/MoonIcon";
import SunIcon from "@heroicons/react/24/solid/SunIcon";

import { CacheManager } from "../utils/CacheManager";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = CacheManager.getString("theme");

    if (saved) {
      return saved === "dark";
    }

    return false; // light mode default
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      CacheManager.saveString("theme", "dark");
    } else {
      root.classList.remove("dark");
      CacheManager.saveString("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark((prev) => !prev)}
      aria-label="Toggle theme"
      className="flex h-10 w-10 hover:cursor-pointer items-center justify-center rounded-full border border-content-muted/20 bg-surface text-content transition-colors hover:bg-base"
    >
      {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
}
