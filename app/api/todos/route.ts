import { NextResponse } from "next/server";
import { getTodos, createTodo } from "@/app/apihelper/todos";

export async function GET() {
  const list = await getTodos();
  return NextResponse.json(list, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body.title !== "string" || body.title.trim() === "") {
      return NextResponse.json({ error: "Invalid payload: 'title' is required" }, { status: 400 });
    }

    const todo = await createTodo({ title: body.title, completed: body.completed });
    return NextResponse.json(todo, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to parse request body" }, { status: 400 });
  }
}
