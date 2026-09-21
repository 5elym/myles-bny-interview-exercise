import { useState } from "react";

export default function FilterPanel() {
  const [filters, setFilters] = useState({
    provider: "all",
    fromDate: new Date().toDateString(),
    toDate: new Date().toDateString(),
    category: "all",
    // Maybe add more
  });

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
              <option value="gnews">GNews</option>
              <option value="nyt">New York Times</option>
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
              value={filters.fromDate}
              onChange={handleFilterSelect}
              className="rounded-lg border border-content-muted/20 bg-base p-2 text-sm text-content outline-none focus:primary"
            />
          </div>

          {/* Add more text inputs for exactPhrase, etc., following the same pattern */}
        </div>
      </div>
    </>
  );
}
