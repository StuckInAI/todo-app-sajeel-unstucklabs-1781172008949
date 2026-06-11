import { useState } from 'react';
import { Check, Trash2, Pencil, X, GripVertical } from 'lucide-react';
import { Todo } from '@/types';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  index: number;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
};

const PRIORITY_BADGE: Record<string, string> = {
  low: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  medium: 'bg-amber-50 text-amber-600 border-amber-200',
  high: 'bg-red-50 text-red-600 border-red-200',
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  index,
  onReorder,
}: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [dragging, setDragging] = useState(false);

  function handleEditSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onEdit(todo.id, editText);
    setEditing(false);
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>): void {
    e.dataTransfer.setData('text/plain', String(index));
    setDragging(true);
  }

  function handleDragEnd(): void {
    setDragging(false);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (dragIndex !== index) {
      onReorder(dragIndex, index);
    }
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={clsx(
        'group flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm transition-all duration-150',
        todo.completed ? 'border-slate-100 opacity-60' : 'border-slate-200 hover:border-primary-300 hover:shadow-md',
        dragging && 'opacity-30 scale-95'
      )}
    >
      {/* Drag handle */}
      <span className="text-slate-300 cursor-grab active:cursor-grabbing shrink-0 hidden group-hover:block">
        <GripVertical size={16} />
      </span>

      {/* Checkbox */}
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all',
          todo.completed
            ? 'bg-primary-500 border-primary-500'
            : 'border-slate-300 hover:border-primary-400'
        )}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <Check size={13} className="text-white" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <form onSubmit={handleEditSubmit} className="flex gap-2">
            <input
              autoFocus
              className="input py-1 text-sm"
              value={editText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            />
            <button type="submit" className="btn-primary py-1 px-3 text-xs">
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setEditText(todo.text);
              }}
              className="btn-ghost py-1 px-2"
            >
              <X size={14} />
            </button>
          </form>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={clsx(
                'text-sm font-medium truncate',
                todo.completed && 'line-through text-slate-400'
              )}
            >
              {todo.text}
            </span>
            <span
              className={clsx(
                'text-xs px-2 py-0.5 rounded-full border font-medium shrink-0',
                PRIORITY_BADGE[todo.priority]
              )}
            >
              {todo.priority}
            </span>
            <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full shrink-0">
              {todo.category}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      {!editing && (
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="btn-ghost p-1.5"
            aria-label="Edit"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            className="btn-danger p-1.5"
            aria-label="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
