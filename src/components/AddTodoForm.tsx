import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Priority } from '@/types';
import clsx from 'clsx';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
};

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-emerald-500' },
  { value: 'medium', label: 'Medium', color: 'text-amber-500' },
  { value: 'high', label: 'High', color: 'text-red-500' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');
  const [expanded, setExpanded] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setCategory('');
    setPriority('medium');
    setExpanded(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white shadow-md border border-slate-100 p-5 mb-6"
    >
      <div className="flex gap-3 items-center">
        <input
          className="input flex-1"
          type="text"
          placeholder="Add a new task…"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
        />
        <button type="submit" className="btn-primary shrink-0">
          <Plus size={18} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {expanded && (
        <div className="mt-4 flex flex-wrap gap-3 items-center animate-fade-in">
          <div className="flex gap-2 items-center">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Priority</span>
            {PRIORITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPriority(opt.value)}
                className={clsx(
                  'px-3 py-1 rounded-full text-xs font-semibold border transition-all',
                  priority === opt.value
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Category</span>
            <input
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200 w-32"
              type="text"
              placeholder="e.g. Work"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="ml-auto text-xs text-slate-400 hover:text-slate-600 underline"
          >
            Collapse
          </button>
        </div>
      )}
    </form>
  );
}
