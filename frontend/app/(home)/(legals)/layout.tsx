import { PropsWithChildren } from "react";

export const dynamic = "force-static";

function Layout({ children }: PropsWithChildren) {
  return (
    <main className="prose mx-auto my-14 max-w-5xl px-8 dark:prose-invert">
      {children}
    </main>
  );
}

export default Layout;
