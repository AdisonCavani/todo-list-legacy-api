import { listTasks } from "@api/client";
import App from "@components/App";
import ReduxInitializer from "@components/ReduxInitializer";
import ReduxProvider from "@components/ReduxProvider";

async function Page() {
  const res = await listTasks({
    page: 1,
    pageSize: 25,
  });

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-y-2">
      <ReduxProvider>
        <ReduxInitializer tasks={res.data} />
        <App />
      </ReduxProvider>
    </section>
  );
}

export default Page;
