import { useState, useMemo, useCallback } from "react";
import { Plus } from "lucide-react";
import Toast from "./Toast";

const AddTodoForm = ({ onAdd, isDark }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  // Validate the form
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!text || text.trim().length < 3) {
      newErrors.text = "Todo text must be at least 3 characters";
    }

    if (!category || category.trim() === "") {
      newErrors.category = "Category is required";
    }

    if (!dueDate || dueDate.trim() === "") {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [text, category, dueDate]);

  // Reset form
  const resetForm = () => {
    setText("");
    setCategory("");
    setDueDate("");
    setErrors({});
  };

  // Handle submit
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (validateForm()) {
        onAdd(text.trim(), category, dueDate);
        resetForm();
        setToast({ message: "Todo added successfully!", type: "success" });
      } else {
        setToast({ message: "Please fix the errors!", type: "error" });
      }
    },
    [validateForm, onAdd, text, category, dueDate]
  );

  // Dynamic input classes
  const inputClassName = useMemo(
    () =>
      `w-full px-4 py-3 rounded-lg border-2 transition-all ${
        isDark
          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
      } ${errors.text ? "border-red-500" : "focus:border-blue-500"} focus:outline-none`,
    [isDark, errors.text]
  );

  const selectClassName = useMemo(
    () =>
      `w-full px-4 py-3 rounded-lg border-2 transition-all ${
        isDark
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-200 text-gray-900"
      } ${errors.category ? "border-red-500" : "focus:border-blue-500"} focus:outline-none`,
    [isDark, errors.category]
  );

  const dateClassName = useMemo(
    () =>
      `w-full px-4 py-3 rounded-lg border-2 transition-all ${
        isDark
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-200 text-gray-900"
      } ${errors.dueDate ? "border-red-500" : "focus:border-blue-500"} focus:outline-none`,
    [isDark, errors.dueDate]
  );

  const buttonClassName = useMemo(
    () =>
      `w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
        isDark
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`,
    [isDark]
  );

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className={inputClassName}
            aria-invalid={!!errors.text}
            autoFocus
          />
          {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectClassName}
              aria-invalid={!!errors.category}
            >
              <option value="">Select Category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={dateClassName}
              min={new Date().toISOString().split("T")[0]}
              aria-invalid={!!errors.dueDate}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>
        </div>

        <button type="submit" className={buttonClassName}>
          <Plus className="w-5 h-5" />
          Add Todo
        </button>
      </form>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </>
  );
};

export default AddTodoForm;
