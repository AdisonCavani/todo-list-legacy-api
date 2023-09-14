import SideNav from "@components/app/side-nav";
import AuthWrapper from "@components/auth-wrapper";
import ReactQueryWrapper from "@components/react-query-wrapper";
import { lists } from "@db/schema";
import { db } from "@db/sql";
import { auth } from "@lib/auth";
import { eq } from "drizzle-orm";
import type { PropsWithChildren } from "react";

async function Layout({ children }: PropsWithChildren) {
  const session = await auth();
  const response = await db
    .select()
    .from(lists)
    .where(eq(lists.userId, session.user.id));

  return (
    <main className="flex grow flex-row">
      <AuthWrapper>
        <ReactQueryWrapper>
          <nav className="sticky top-[72px] hidden h-full w-72 flex-col gap-y-3 border-r bg-secondary px-4 py-7 lg:flex">
            <SideNav initialLists={response} />
          </nav>
          <section className="flex w-full grow flex-col px-3 pb-24 pt-8 sm:px-6 sm:pb-8">
            {children}
          </section>
        </ReactQueryWrapper>
      </AuthWrapper>
    </main>
  );
}

export default Layout;
