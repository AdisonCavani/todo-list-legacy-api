import App from "@components/app/app";
import { tasks } from "@db/schema";
import { db } from "@db/sql";
import { eq } from "drizzle-orm";

type Props = {
  params: { id: string };
};

async function Page({ params: { id } }: Props) {
  const response = await db.select().from(tasks).where(eq(tasks.listId, id));

  return <App initialTasks={response} listId={id} />;
}

export default Page;
