import { listTasks } from "@api/client";
import StoreInitializer from "@components/StoreInitializer";
import App from "@components/App";

async function Page() {
  const res = await listTasks({
    page: 1,
    pageSize: 25,
  });

  return (
    <>
      <StoreInitializer tasks={res.data} />

      <section className="mx-auto flex max-w-7xl flex-col gap-y-2">
        <App />
      </section>
    </>
  );
}

export default Page;
