import { useMemo, useCallback } from "react";

const CategoryFilter = ({ selectedCategory, setSelectedCategory, isDark }) => {
  const categories = useMemo(
    () => ["all", "work", "personal", "shopping", "health", "other"],
    []
  );

  const handleCategoryClick = useCallback(
    (cat) => {
      setSelectedCategory(cat);
    },
    [setSelectedCategory]
  );

  const getButtonClassName = useCallback(
    (cat) => `
      px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
      ${
        selectedCategory === cat
          ? isDark
            ? "bg-blue-600 text-white"
            : "bg-blue-500 text-white"
          : isDark
          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }
    `,
    [selectedCategory, isDark]
  );

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className={getButtonClassName(cat)}
          aria-pressed={selectedCategory === cat}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
