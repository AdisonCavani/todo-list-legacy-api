import { listTasks } from "@api/client";
import App from "@components/App";
import ReduxProvider from "@components/ReduxProvider";

async function Page() {
  const res = await listTasks({
    page: 1,
    pageSize: 25,
  });

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-y-2">
      <ReduxProvider>
        <App tasks={res.data} />
      </ReduxProvider>
    </section>
  );
}

export default Page;
