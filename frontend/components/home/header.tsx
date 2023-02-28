import LoginButton from "./login-button";
import Logo from "@components/logo";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import Link from "next/link";

async function Header() {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();
  const provider = Object.values(providers!).at(0)!;

  return (
    <nav className="flex items-center justify-between py-3 px-6">
      <Logo />

      <div className="flex items-center gap-x-1">
        <a
          href="#"
          className="rounded-lg px-4 py-2 font-semibold hover:bg-neutral-100"
        >
          Blog
        </a>
        <a
          href="#"
          className="rounded-lg px-4 py-2 font-semibold hover:bg-neutral-100"
        >
          Features
        </a>
        <a
          href="#"
          className="rounded-lg px-4 py-2 font-semibold hover:bg-neutral-100"
        >
          Pricing
        </a>

        <hr
          className="ml-2 mr-5 bg-neutral-300"
          style={{ blockSize: "24px", inlineSize: "1px" }}
        />

        {session ? (
          <Link
            href="/app"
            className="rounded-lg bg-neutral-200 px-4 py-2 font-semibold text-black"
          >
            Open app
          </Link>
        ) : (
          <LoginButton {...provider} />
        )}
      </div>
    </nav>
  );
}

export default Header;
