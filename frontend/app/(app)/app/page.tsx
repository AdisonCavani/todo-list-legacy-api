import { listTasks } from "@api/client";
import App from "@components/App";

async function Page() {
  const res = await listTasks({
    page: 1,
    pageSize: 25,
  });

  return (
    <section className="mx-auto max-w-7xl">
      <App tasks={res.data} />
    </section>
  );
}

export default Page;
