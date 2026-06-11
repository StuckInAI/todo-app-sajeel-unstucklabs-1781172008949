import AddTodoForm from '@/components/AddTodoForm';
import TodoItem from '@/components/TodoItem';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';
import EmptyState from '@/components/EmptyState';
import { useTodos } from '@/hooks/useTodos';

export default function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    categories,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    reorderTodos,
  } = useTodos();

  const isFiltered =
    filter !== 'all' || categoryFilter !== 'all' || !!searchQuery;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-primary-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            ✅ My Tasks
          </h1>
          <p className="mt-2 text-slate-500 text-sm">Stay organized, stay productive.</p>
        </header>

        {/* Stats */}
        {stats.total > 0 && <StatsBar stats={stats} />}

        {/* Add form */}
        <AddTodoForm onAdd={addTodo} />

        {/* Filters */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClearCompleted={clearCompleted}
          completedCount={stats.completed}
        />

        {/* List */}
        {filteredTodos.length === 0 ? (
          <EmptyState filtered={isFiltered} />
        ) : (
          <div className="space-y-3">
            {filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
                onReorder={reorderTodos}
              />
            ))}
          </div>
        )}

        <footer className="mt-10 text-center text-xs text-slate-400">
          Tasks are saved automatically in your browser.
        </footer>
      </div>
    </div>
  );
}
