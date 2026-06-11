import { Search, X } from 'lucide-react';
import { FilterType } from '@/types';
import clsx from 'clsx';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  categories: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
  searchQuery,
  setSearchQuery,
  onClearCompleted,
  completedCount,
}: FilterBarProps) {
  return (
    <div className="mb-5 space-y-3">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          className="input pl-9 pr-9"
          type="text"
          placeholder="Search tasks…"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter tabs + category */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={clsx(
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                filter === f.value
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
            >
              <option value="all">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}

          {completedCount > 0 && (
            <button
              type="button"
              onClick={onClearCompleted}
              className="text-sm text-red-400 hover:text-red-600 underline"
            >
              Clear completed ({completedCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
