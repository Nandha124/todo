import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterBar from './FilterBar';
import { mockApi } from '../api/mockApi';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await mockApi.fetchTasks(filters);
        if (result.success) setTasks(result.data);
      } catch (_) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [filters]);

  const handleCreateTask = () => {
    setFormMode('create');
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task) => {
    setFormMode('edit');
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const result = await mockApi.deleteTask(taskId);
      if (result.success) {
        setTasks(prev => prev.filter(t => t.id !== taskId));
      }
    } catch (_) {
      setError('Failed to delete task');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === 'create') {
        const result = await mockApi.createTask(formData);
        if (result.success) setTasks(prev => [...prev, result.data]);
      } else if (formMode === 'edit') {
        const result = await mockApi.updateTask(editingTask.id, formData);
        if (result.success)
          setTasks(prev =>
            prev.map(t => (t.id === editingTask.id ? result.data : t))
          );
      }
      handleFormClose();
    } catch (_) {
      setError('Failed to save task');
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
    localStorage.removeItem('taskFormState');
  };

  return (
    <div className="task-dashboard">
      <header className="dashboard-header">
        <h1>Task Management Dashboard</h1>
        <button className="create-task-btn" onClick={handleCreateTask}>
          + Create Task
        </button>
      </header>

      {error && <div className="error-banner">Error: {error}</div>}

      <FilterBar filters={filters} onFiltersChange={setFilters} />

      <TaskList
        tasks={tasks}
        loading={loading}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
<TaskForm
  isOpen={isFormOpen}
  mode={formMode}
  initialData={editingTask}
  onSubmit={handleFormSubmit}
  onClose={handleFormClose}
/>

    </div>
  );
};

export default TaskDashboard;
