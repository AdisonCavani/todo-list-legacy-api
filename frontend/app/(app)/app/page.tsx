import { httpGet } from "@api/client";
import App from "@components/app/app";
import AuthWrapper from "@components/auth-wrapper";
import ReactQueryWrapper from "@components/react-query-wrapper";
import StoreInitializer from "@components/store-initializer";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Tasks",
};

async function Page() {
  const session = await getServerSession(authOptions);

  const res = await httpGet(
    "/task",
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
