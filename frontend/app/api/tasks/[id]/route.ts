import { tasks } from "@db/schema";
import { db } from "@db/sql";
import { auth } from "@lib/auth";
import { and, eq } from "drizzle-orm";

async function DELETE(
  _: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await auth();

  await db
    .delete(tasks)
    .where(and(eq(tasks.id, id), eq(tasks.userId, session!.user.id)));

  return new Response(null, { status: 204 });
}

export { DELETE };
