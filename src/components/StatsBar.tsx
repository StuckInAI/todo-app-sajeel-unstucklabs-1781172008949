import { CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { TodoStats } from '@/types';

type StatsBarProps = {
  stats: TodoStats;
};

export default function StatsBar({ stats }: StatsBarProps) {
  const pct = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-700 p-5 text-white shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Progress</h2>
        <span className="text-primary-100 text-sm">{pct}% done</span>
      </div>
      <div className="w-full h-2 bg-primary-400/40 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-white rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="flex flex-col items-center gap-1">
          <ListTodo size={20} className="text-primary-200" />
          <span className="text-2xl font-bold">{stats.total}</span>
          <span className="text-xs text-primary-200">Total</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Circle size={20} className="text-primary-200" />
          <span className="text-2xl font-bold">{stats.active}</span>
          <span className="text-xs text-primary-200">Active</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <CheckCircle2 size={20} className="text-primary-200" />
          <span className="text-2xl font-bold">{stats.completed}</span>
          <span className="text-xs text-primary-200">Done</span>
        </div>
      </div>
    </div>
  );
}
