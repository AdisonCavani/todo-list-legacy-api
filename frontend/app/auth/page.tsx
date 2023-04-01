import LoginButton from "@components/auth/login-button";
import { authOptions } from "@lib/auth";
import { IconChecklist, IconChevronLeft } from "@tabler/icons-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign in",
};

async function Page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/app");

  return (
    <main className="mx-auto flex h-screen w-screen flex-col items-center justify-center px-6">
      {/* TODO: fix */}
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <IconChevronLeft size={18} />
        Back
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 xs:w-80">
        <div className="flex flex-col space-y-2 text-center">
          <IconChecklist className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Sign in to your account using OAuth2 providers
          </p>
        </div>

        <hr className="w-full border-slate-300 dark:border-slate-500" />

        <LoginButton />
      </div>
    </main>
  );
}

export default Page;
