import React from "react";

// GlobalSearch Component
const GlobalSearch = ({
  setQuery,
  query,
  filteredData,
  placeholder = "Search...",
}) => {
  return (
    <div className="w-full max-w-full mx-auto  relative">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-10 border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>
    </div>
  );
};

export default GlobalSearch;
