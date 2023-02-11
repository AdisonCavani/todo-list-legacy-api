import { listTasks } from "@api/client";
import StoreInitializer from "@components/storeInitializer";
import ReactQueryWrapper from "@components/reactQueryWrapper";
import App from "@components/app";

async function Page() {
  const res = await listTasks({
    page: 1,
    pageSize: 100,
  });

  return (
    <>
      <StoreInitializer tasks={res.data} />

      <section className="mx-auto flex max-w-7xl flex-col gap-y-2">
        <ReactQueryWrapper>
          <App />
        </ReactQueryWrapper>
      </section>
    </>
  );
}

export default Page;
