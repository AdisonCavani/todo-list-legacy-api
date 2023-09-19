import type { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <section className="flex w-full grow flex-col px-3 pb-24 pt-8 sm:px-6 sm:pb-8">
      {children}
    </section>
  );
}

export default Layout;
