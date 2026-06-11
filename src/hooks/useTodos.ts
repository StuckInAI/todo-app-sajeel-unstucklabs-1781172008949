import { useState, useEffect } from 'react';
import { Todo, Priority, FilterType } from '@/types';
import { loadTodos, saveTodos, generateId } from '@/lib/storage';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [filter, setFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(text: string, priority: Priority, category: string): void {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
      category: category.trim() || 'General',
    };
    setTodos((prev) => [newTodo, ...prev]);
  }

  function toggleTodo(id: string): void {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: string): void {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id: string, text: string): void {
    if (!text.trim()) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text.trim() } : t))
    );
  }

  function clearCompleted(): void {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  function reorderTodos(dragIndex: number, hoverIndex: number): void {
    setTodos((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(dragIndex, 1);
      copy.splice(hoverIndex, 0, removed);
      return copy;
    });
  }

  const categories = Array.from(new Set(todos.map((t) => t.category)));

  const filteredTodos = todos.filter((t) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !t.completed) ||
      (filter === 'completed' && t.completed);
    const matchesCategory =
      categoryFilter === 'all' || t.category === categoryFilter;
    const matchesSearch =
      !searchQuery || t.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
  };

  return {
    todos,
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
  };
}
