'use client';

import React, { useEffect, useRef, useState, FormEvent } from 'react';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('todos_v1') : null;
      return raw ? (JSON.parse(raw) as Todo[]) : [];
    } catch {
      return [];
    }
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('todos_v1', JSON.stringify(todos));
    } catch {
      // ignore
    }
  }, [todos]);

  function addTodo(e: FormEvent) {
    e.preventDefault();
    const text = inputRef.current?.value.trim();
    if (!text) return;
    const newTodo: Todo = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      text,
      done: false,
    };
    setTodos((s) => [newTodo, ...s]);
    if (inputRef.current) inputRef.current.value = '';
  }

  function toggleTodo(id: string) {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id: string) {
    setTodos((s) => s.filter((t) => t.id !== id));
  }

  return (
    <main className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Todo</h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            aria-label="New todo"
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Add a todo..."
          />
          <button type="submit" className="px-3 py-2 bg-slate-800 text-white rounded">
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {todos.length === 0 ? (
            <li className="text-sm text-slate-500">No todos yet</li>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className="flex items-center justify-between border rounded p-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4"
                  />
                  <span className={todo.done ? 'line-through text-slate-500' : ''}>{todo.text}</span>
                </label>
                <button onClick={() => deleteTodo(todo.id)} className="text-sm text-red-500">
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}
