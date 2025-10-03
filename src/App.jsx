import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Sun, Moon, Plus, Trash2 } from "lucide-react";
import AddTodoForm from "./components/AddForm";
import TodoItem from "./components/TodoItem";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import { ThemeProvider, useTheme } from "./components/ThemeProvider.jsx";

import useTodos from "./hook/useTodos";
const App = () => {
  const { isDark, toggleTheme } = useTheme();
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [toggleTheme]);

  const { filteredTodos, stats } = useMemo(() => {
    let active = 0,
      completed = 0;
    const filtered = todos.filter((todo) => {
      if (!todo.completed) active++;
      else completed++;

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !todo.completed) ||
        (filter === "completed" && todo.completed);

      const matchesSearch = todo.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || todo.category === selectedCategory;

      return matchesFilter && matchesSearch && matchesCategory;
    });

    return {
      filteredTodos: filtered,
      stats: { total: todos.length, active, completed },
    };
  }, [todos, filter, searchTerm, selectedCategory]);

  const buttonClass = (
    active,
    dark,
    activeBg = "bg-blue-500",
    inactiveBg = "bg-gray-100"
  ) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      active
        ? dark
          ? "bg-blue-600 text-white"
          : `${activeBg} text-white`
        : dark
        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
        : `${inactiveBg} text-gray-700 hover:bg-gray-200`
    }`;

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className={`text-4xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              My Tasks
            </h1>
            <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {stats.active} active, {stats.completed} completed
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-lg transition-all ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                : "bg-white hover:bg-gray-100 text-gray-700 shadow-md"
            }`}
            title="Toggle theme (Ctrl+D)"
          >
            {isDark ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={`p-6 rounded-xl mb-6 ${
            isDark ? "bg-gray-800" : "bg-white shadow-lg"
          }`}
        >
          <AddTodoForm onAdd={addTodo} isDark={isDark} />
        </div>

        <div className="space-y-4 mb-6">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isDark={isDark}
          />
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isDark={isDark}
          />

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-sm font-medium ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Show:
            </span>
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={buttonClass(filter === f, isDark)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
            {stats.completed > 0 && (
              <button
                onClick={clearCompleted}
                className={`ml-auto px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isDark
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                Clear Completed
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div
              className={`text-center py-12 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <p className="text-lg">No todos found</p>
              <p className="text-sm mt-1">Add a new task to get started!</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                isDark={isDark}
              />
            ))
          )}
        </div>

        <footer
          className={`mt-12 pt-6 border-t-2 text-center ${
            isDark
              ? "border-gray-700 text-gray-400"
              : "border-gray-200 text-gray-600"
          }`}
        >
          <p className="text-sm">
            Created by{" "}
            <span className="font-semibold">Nandhakumar S</span>
          </p>
          <p className="text-xs mt-1">
            GitHub:{" "}
            <a
              href="ht"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              https://github.com/Nandha124/todo-list.git
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};
export default App;
