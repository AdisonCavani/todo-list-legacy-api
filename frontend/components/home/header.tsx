import Link from "next/link";

function Header() {
  return (
    <header className="fixed inset-0 z-10 flex h-12">
      <nav className="w-full">
        <ul className="mx-auto flex h-full items-center px-8">
          <li className="ml-auto">
            <Link
              href="/app"
              className="flex h-8 items-center justify-center rounded-full bg-blue-600 px-4 text-sm font-medium"
            >
              Open app
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
