import { httpGet } from "@api/client";
import App from "@components/app/app";
import AuthWrapper from "@components/auth-wrapper";
import ReactQueryWrapper from "@components/react-query-wrapper";
import { authOptions } from "@lib/auth";
import { ColorRecordType, twindConfig } from "@lib/twind";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "App",
  themeColor: [
    {
      color: (twindConfig.colors.blue as ColorRecordType)[600],
      media: "(prefers-color-scheme: light)",
    },
    {
      color: (twindConfig.colors.neutral as ColorRecordType)[800],
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

async function Page() {
  const session = await getServerSession(authOptions);

  const res = await httpGet(
    "/tasks",
    {
      pageSize: 100,
    },
    session?.user.access_token!
  );

  return (
    <AuthWrapper>
      <ReactQueryWrapper>
        <App
          initialData={res?.data ?? []}
          token={session?.user.access_token!}
        />
      </ReactQueryWrapper>
    </AuthWrapper>
  );
}

export default Page;
