import { Todo } from '@/types';

const STORAGE_KEY = 'todo-app-todos';

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Todo[];
  } catch (e: any) {
    console.error('Failed to load todos:', e.message);
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e: any) {
    console.error('Failed to save todos:', e.message);
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
