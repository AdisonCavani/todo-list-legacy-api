import { listTasks } from "@api/client";
import App from "@components/App";

async function Page() {
  const res = await listTasks({
    page: 1,
    pageSize: 25,
  });

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-y-6 px-6">
      <App tasks={res.data} />
    </section>
  );
}

export default Page;
