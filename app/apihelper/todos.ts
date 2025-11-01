type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

// In-memory store (server process memory)
const todos: Todo[] = [];

function generateId(): string {
  try {
    // prefer crypto.randomUUID when available
    // @ts-ignore
    if (globalThis?.crypto && typeof (globalThis.crypto as any).randomUUID === "function") {
      // @ts-ignore
      return (globalThis.crypto as any).randomUUID();
    }
  } catch (e) {
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
    completed: typeof payload.completed === "boolean" ? payload.completed : false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  return todo;
}
