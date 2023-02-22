import StoreInitializer from "@components/storeInitializer";
import ReactQueryWrapper from "@components/reactQueryWrapper";
import App from "@components/app/app";
import AuthWrapper from "@components/authWrapper";
import { get } from "@api/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";

async function Page() {
  const session = await getServerSession(authOptions);

  const res = await get(
    "/task/list",
    {
      page: 1,
      pageSize: 100,
    },
    session?.user.accessToken!
  );

  return (
    <>
      <StoreInitializer tasks={res?.data ?? []} />

      <AuthWrapper>
        <ReactQueryWrapper>
          <App />
        </ReactQueryWrapper>
      </AuthWrapper>
    </>
  );
}

export default Page;
