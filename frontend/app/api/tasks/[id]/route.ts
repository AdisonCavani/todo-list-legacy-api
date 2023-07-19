import { tasks } from "@db/schema";
import { db } from "@db/sql";
import { auth } from "@lib/auth";
import { and, eq } from "drizzle-orm";

async function DELETE(
  _: Request,
  { params: { id } }: { params: { id: string } },
) {
  const session = await auth();

  if (!session) return new Response("Unauthorized", { status: 401 });

  const response = await db
    .delete(tasks)
    .where(and(eq(tasks.id, id), eq(tasks.userId, session.user.id)));

  if (response.rowsAffected > 0) return new Response(null, { status: 204 });

  return new Response(null, { status: 404 });
}

export { DELETE };
