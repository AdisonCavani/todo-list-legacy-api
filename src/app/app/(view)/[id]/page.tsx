import App from "@components/app/app";
import { lists, tasks } from "@db/schema";
import { db } from "@db/sql";
import { auth } from "@lib/auth";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

async function Page({ params: { id } }: Props) {
  const session = await auth();

  const [listsResponse, tasksResponse] = await Promise.all([
    db
      .selectDistinct()
      .from(lists)
      .where(and(eq(lists.id, id), eq(lists.userId, session.user.id))),
    db.select().from(tasks).where(eq(tasks.listId, id)),
  ]);

  if (!listsResponse.length) notFound();

  return <App initialTasks={tasksResponse} listId={id} />;
}

export default Page;
