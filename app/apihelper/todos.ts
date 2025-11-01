export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

// In-memory store (server process memory)
const todos: Todo[] = [];

type CryptoWithUUID = { randomUUID?: () => string };

function generateId(): string {
  try {
    const cryptoObj = (globalThis as unknown as { crypto?: CryptoWithUUID })?.crypto;
    if (cryptoObj && typeof cryptoObj.randomUUID === 'function') {
      return cryptoObj.randomUUID();
    }
  } catch {
    // ignore
  }
  return Date.now().toString();
}

export async function getTodos(): Promise<Todo[]> {
  return todos;
}

export async function createTodo(payload: { title: string; completed?: boolean }): Promise<Todo> {
  const todo: Todo = {
    id: generateId(),
    title: payload.title.trim(),
    completed: typeof payload.completed === 'boolean' ? payload.completed : false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  return todo;
}
