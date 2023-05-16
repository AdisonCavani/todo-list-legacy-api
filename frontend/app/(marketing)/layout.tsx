import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <main className="prose mx-auto max-w-2xl p-6 dark:prose-invert">
      {children}
    </main>
  );
}

export default Layout;
