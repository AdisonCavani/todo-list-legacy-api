import ProfileMenu from "./profile-menu";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex w-full items-center justify-between bg-blue-600 px-4 py-2">
      <Link href="/" prefetch={false} className="p-1 font-semibold text-white">
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
