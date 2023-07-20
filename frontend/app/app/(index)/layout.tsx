import type { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-full w-full grow flex-col px-3 py-8 md:px-6">
      {children}
    </main>
  );
}

export default Layout;
