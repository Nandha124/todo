import { useState, useEffect, useCallback } from "react";

const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = window.localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  const addTodo = useCallback((text, category, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      category,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted };
};

export default useTodos;
