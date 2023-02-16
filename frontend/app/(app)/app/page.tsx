import { listTasks } from "@api/client";
import StoreInitializer from "@components/storeInitializer";
import ReactQueryWrapper from "@components/reactQueryWrapper";
import App from "@components/app";
import AuthWrapper from "@components/authWrapper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@lib/auth";

async function Page() {
  const session = await getServerSession(authOptions);

  const res = await listTasks(
    {
      page: 1,
      pageSize: 100,
    },
    session?.user.accessToken!
  );

  return (
    <>
      <StoreInitializer tasks={res?.data ?? []} />

      <section className="mx-auto flex max-w-7xl flex-col gap-y-2">
        <AuthWrapper>
          <ReactQueryWrapper>
            <App />
          </ReactQueryWrapper>
        </AuthWrapper>
      </section>
    </>
  );
}

export default Page;
