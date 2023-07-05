import { tasks, type TaskType } from "@db/schema";
import { db } from "@db/sql";
import { authOptions } from "@lib/auth";
import type { CreateTaskRequest, UpdateTaskRequest } from "@lib/types";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { v4 } from "uuid";

async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const task = (await request.json()) as CreateTaskRequest;

  const entity = {
    ...task,
    id: v4(),
    isCompleted: false,
    isImportant: false,
    userId: session!.user.id,
  };

  await db.insert(tasks).values(entity);

  const response: TaskType = {
    ...entity,
    description: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: entity.dueDate ?? null,
  };

  return new Response(JSON.stringify(response), { status: 201 });
}

async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  const task = (await request.json()) as UpdateTaskRequest;
  await db
    .update(tasks)
    .set(task)
    .where(and(eq(tasks.id, task.id), eq(tasks.userId, session!.user.id)));

  const response: TaskType = {
    ...task,
    description: task.description ?? null,
    dueDate: task.dueDate ?? null,
    isCompleted: task.isCompleted ?? false,
    isImportant: task.isImportant ?? false,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: session!.user.id,
  };

  return new Response(JSON.stringify(response), { status: 200 });
}

export { POST, PATCH };
