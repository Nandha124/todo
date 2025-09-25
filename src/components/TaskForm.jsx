
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { TASK_TYPES, PRIORITIES, BUG_SEVERITIES } from '../api/mockApi';

const TaskForm = ({
  isOpen,
  mode, 
  initialData = null,
  onSubmit,
  onClose,
  users = [],
  projects = [],
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      taskType: initialData?.taskType || 'Bug',
      priority: initialData?.priority || 'Medium',
      projectId: initialData?.projectId || '',
      assigneeId: initialData?.assigneeId || '',
      dueDate: initialData?.dueDate || '',
      subtasks: initialData?.subtasks || [],
      acceptanceCriteria: initialData?.acceptanceCriteria || [],
      severity: initialData?.severity || 'Medium',
      businessValue: initialData?.businessValue || '',
    },
  });

  const { fields: subtasks, append: appendSubtask, remove: removeSubtask } = useFieldArray({
    control,
    name: 'subtasks',
  });

  const { fields: acceptanceCriteria, append: appendCriteria, remove: removeCriteria } = useFieldArray({
    control,
    name: 'acceptanceCriteria',
  });
  const taskType = watch('taskType');

  useEffect(() => {
    reset({
      title: initialData?.title || '',
      description: initialData?.description || '',
      taskType: initialData?.taskType || 'Bug',
      priority: initialData?.priority || 'Medium',
      projectId: initialData?.projectId || '',
      assigneeId: initialData?.assigneeId || '',
      dueDate: initialData?.dueDate || '',
      subtasks: initialData?.subtasks || [],
      acceptanceCriteria: initialData?.acceptanceCriteria || [],
      severity: initialData?.severity || 'Medium',
      businessValue: initialData?.businessValue || '',
    });
  }, [initialData, reset, isOpen]);

  if (!isOpen) return null;
const onFormSubmit = async (data) => {
  await onSubmit(data);
  if (mode === 'create') reset(); 
};


  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <div className="task-form-header">
          <h2>{mode === 'create' ? 'Create New Task' : 'Edit Task'}</h2>
          <button onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit(onFormSubmit)}>

    
          <div className="form-group">
            <label>Title *</label>
            <input {...register('title', { required: true })} />
          </div>
          <div className="form-group">
            <label>Task Type *</label>
            <select {...register('taskType')}>
              {TASK_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

      
          <div className="form-group">
            <label>Priority *</label>
            <select {...register('priority')}>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

        
          <div className="form-group">
            <label>Project</label>
            <select {...register('projectId')}>
              <option value="">Select project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

        
          <div className="form-group">
            <label>Assignee</label>
            <select {...register('assigneeId')}>
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          
          <div className="form-group">
            <label>Description</label>
            <textarea {...register('description')} />
          </div>

        
          <div className="form-group">
            <label>Due Date</label>
            <input type="date" {...register('dueDate')} />
          </div>

        
          {taskType === 'Bug' && (
            <div className="form-group">
              <label>Severity</label>
              <select {...register('severity')}>
                {BUG_SEVERITIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}

          {taskType === 'Feature' && (
            <div className="form-group">
              <label>Business Value</label>
              <input {...register('businessValue')} />

              <label>Acceptance Criteria</label>
              {acceptanceCriteria.map((field, index) => (
                <div key={field.id} className="subtask-row">
                  <input {...register(`acceptanceCriteria.${index}.value`)} />
                  <button type="button" onClick={() => removeCriteria(index)}>
                    ×
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => appendCriteria({ value: '' })}>
                + Add Criteria
              </button>
            </div>
          )}

          
          <div className="form-group">
            <label>Subtasks</label>
            {subtasks.map((field, index) => (
              <div key={field.id} className="subtask-row">
                <input {...register(`subtasks.${index}.title`)} />
                <button type="button" onClick={() => removeSubtask(index)}>
                  ×
                </button>
              </div>
            ))}
            <button type="button" onClick={() => appendSubtask({ title: '', completed: false })}>
              + Add Subtask
            </button>
          </div>

          
          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={loading || !isValid}>
              {loading ? 'Saving...' : mode === 'create' ? 'Create Task' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
