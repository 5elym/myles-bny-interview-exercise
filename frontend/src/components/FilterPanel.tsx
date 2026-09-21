import { useEffect, useState } from "react";
import { fetchProviderNames } from "../services/SearchService";

export default function FilterPanel() {
  const [filters, setFilters] = useState({
    provider: "all",
    fromDate: "",
    toDate: "",
    category: "all",
    // Maybe add more
  });

  const [providers, setProviders] = useState<string[]>([]);

  useEffect(() => {
    const getProviders = async () => {
      try {
        const retrievedProviders = await fetchProviderNames();
        setProviders(retrievedProviders);
      } catch (error) {
        console.error("Failed to fetch providers", error);
      }
    };

    getProviders();
  }, []);

  const handleFilterSelect = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="absolute top-full left-0 z-40 mt-2 w-full rounded-xl border border-content-muted/20 bg-surface p-4 shadow-lg">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Provider Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-xs text-content-muted">Provider</label>
            <select
              name="provider"
              value={filters.provider}
              onChange={handleFilterSelect}
              className="rounded-lg border border-content-muted/20 bg-base p-2 text-sm text-content outline-none focus:primary"
            >
              {/* TODO: Retrieve provider list*/}
              <option value="all">All Providers</option>
              {providers.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-xs text-content-muted">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterSelect}
              className="rounded-lg border border-content-muted/20 bg-base p-2 text-sm text-content outline-none transition-colors focus:primary"
            >
              <option value="all">Any Category</option>
              <option value="world">World</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
              <option value="science">Science</option>
              <option value="health">Health</option>
            </select>
          </div>

          {/* From Date Filter */}
          <div className="flex flex-col">
            <label className="mb-1 text-xs text-content-muted">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleFilterSelect}
              className="rounded-lg border border-content-muted/20 bg-base p-2 text-sm text-content outline-none focus:primary"
            />
          </div>

          {/* To Date Filter */}
          <div className="flex flex-col">
            <label className="mb-1 text-xs text-content-muted">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={filters.toDate}
              onChange={handleFilterSelect}
              className="rounded-lg border border-content-muted/20 bg-base p-2 text-sm text-content outline-none focus:primary"
            />
          </div>
        </div>
      </div>
    </>
  );
}
