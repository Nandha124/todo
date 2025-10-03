import { useMemo, useCallback } from "react";
import { Check, Trash2, Tag, Calendar } from "lucide-react";

const CATEGORY_COLORS = {
  work: "bg-purple-500",
  personal: "bg-green-500",
  shopping: "bg-yellow-500",
  health: "bg-red-500",
  other: "bg-gray-500",
};

const TodoItem = ({ todo, onToggle, onDelete, isDark }) => {
  const isOverdue = useMemo(() => {
    const today = new Date();
    const due = new Date(todo.dueDate);
    return due.setHours(0,0,0,0) < today.setHours(0,0,0,0) && !todo.completed;
  }, [todo.dueDate, todo.completed]);

  const handleToggle = useCallback(() => onToggle(todo.id), [onToggle, todo.id]);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [onDelete, todo.id]);

  const formattedDate = useMemo(
    () => new Date(todo.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    [todo.dueDate]
  );

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        isDark ? "bg-gray-700 border-gray-600 hover:border-gray-500" : "bg-white border-gray-200 hover:border-gray-300"
      } ${todo.completed ? "opacity-60" : ""}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          aria-pressed={todo.completed}
          className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
            todo.completed
              ? "bg-green-500 border-green-500"
              : isDark
                ? "border-gray-500 hover:border-green-500"
                : "border-gray-300 hover:border-green-500"
          }`}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`text-lg ${todo.completed ? "line-through" : ""} ${isDark ? "text-white" : "text-gray-900"} break-words`}>
            {todo.text}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-white ${CATEGORY_COLORS[todo.category]}`}>
              <Tag className="w-3 h-3" />
              {todo.category}
            </span>

            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                isOverdue
                  ? "bg-red-100 text-red-700"
                  : isDark
                    ? "bg-gray-600 text-gray-300"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          </div>
        </div>

        <button
          onClick={handleDelete}
          aria-label="Delete todo"
          className={`p-2 rounded-lg transition-all flex-shrink-0 ${
            isDark ? "hover:bg-red-600 text-gray-400 hover:text-white" : "hover:bg-red-50 text-gray-400 hover:text-red-600"
          }`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
