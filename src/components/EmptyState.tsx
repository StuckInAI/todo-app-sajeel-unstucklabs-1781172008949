import { ClipboardList } from 'lucide-react';

type EmptyStateProps = {
  filtered: boolean;
};

export default function EmptyState({ filtered }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      <ClipboardList size={48} className="mb-4 text-slate-300" />
      {filtered ? (
        <>
          <p className="text-base font-medium">No matching tasks</p>
          <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
        </>
      ) : (
        <>
          <p className="text-base font-medium">No tasks yet</p>
          <p className="text-sm mt-1">Add your first task above to get started!</p>
        </>
      )}
    </div>
  );
}
