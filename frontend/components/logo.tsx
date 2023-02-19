import { IconListDetails } from "@tabler/icons-react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-x-2 text-red-600">
      <IconListDetails size={24} className="mt-1" />
      <p className="text-2xl font-bold">To Do</p>
    </Link>
  );
}

export default Logo;
