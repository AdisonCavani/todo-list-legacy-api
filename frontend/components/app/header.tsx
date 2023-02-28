import ProfileMenu from "./profile-menu";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex w-full items-center justify-between gap-x-1 bg-blue-600 px-4 py-2 text-white">
      <Link href="/" prefetch={false} className="p-1 font-semibold">
        To Do
      </Link>
      <ProfileMenu
        firstName={session!.user.firstName}
        lastName={session!.user.lastName}
      />
    </header>
  );
}

export default Header;
