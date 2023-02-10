import { IconMenu2 } from "@tabler/icons-react";

function Header() {
  return (
    <header className="flex w-full flex-row items-center gap-x-1 bg-red-500 px-4 py-2">
      <button className="rounded bg-transparent p-1 text-white outline-none hover:bg-neutral-200/25">
        <IconMenu2 size={22} />
      </button>
    </header>
  );
}

export default Header;
