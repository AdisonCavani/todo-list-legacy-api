import { tasks } from "@db/schema";
import { db } from "@db/sql";
import { authOptions } from "@lib/auth";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

async function DELETE(
  _: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  await db
    .delete(tasks)
    .where(and(eq(tasks.id, id), eq(tasks.userId, session!.user.id)));

  return new Response(null, { status: 204 });
}

export { DELETE };
