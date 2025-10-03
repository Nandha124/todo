import React, { useCallback, useMemo } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm, isDark }) => {
  const handleSearchChange = useCallback(
    (e) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm]
  );

  const inputClassName = useMemo(
    () =>
      `w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all ${
        isDark
          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
          : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500"
      } focus:outline-none`,
    [isDark]
  );

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={inputClassName}
      />
    </div>
  );
};

export default SearchBar;
