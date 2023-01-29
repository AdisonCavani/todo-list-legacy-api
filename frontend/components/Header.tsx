import Image from "next/image";
import Link from "next/link";

import Logo from "@images/logo.svg";

function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-b-[#e6ebf4] bg-white px-4 py-4 sm:px-8">
      <Link href="/">
        <Image src={Logo} alt="Logo" className="w-28 object-contain" />
      </Link>

      <Link
        href="/create-post"
        className="rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white"
      >
        Create
      </Link>
    </header>
  );
}

export default Header;
