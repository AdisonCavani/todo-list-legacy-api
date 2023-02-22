import StoreInitializer from "@components/storeInitializer";
import ReactQueryWrapper from "@components/reactQueryWrapper";
import App from "@components/app/app";
import AuthWrapper from "@components/authWrapper";

async function Page() {
  // const res = await listTasks(
  //   {
  //     page: 1,
  //     pageSize: 100,
  //   },
  //   session?.user.accessToken!
  // );

  const res = {
    data: null,
  };

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
