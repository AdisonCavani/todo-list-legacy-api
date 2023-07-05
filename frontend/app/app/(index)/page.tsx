import App from "@components/app/app";
import AuthWrapper from "@components/auth-wrapper";
import ReactQueryWrapper from "@components/react-query-wrapper";
import { tasks } from "@db/schema";
import { db } from "@db/sql";
import { authOptions } from "@lib/auth";
import { twindConfig, type ColorRecordType } from "@lib/twind";
import { eq } from "drizzle-orm";
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
  const response = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, session!.user.id));

  return (
    <AuthWrapper>
      <ReactQueryWrapper>
        <App initialTasks={response} />
      </ReactQueryWrapper>
    </AuthWrapper>
  );
}

export default Page;
