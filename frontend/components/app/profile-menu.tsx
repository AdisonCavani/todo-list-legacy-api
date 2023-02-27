"use client";

import { Menu, Transition } from "@headlessui/react";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { Fragment } from "react";

type Props = {
  firstName: string;
  lastName: string;
};

function ProfileMenu({ firstName, lastName }: Props) {
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-600 bg-white">
        <span className="text-sm font-semibold text-neutral-600">
          {initials}
        </span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-0 right-0 z-10 mt-10 flex min-w-[200px] flex-col rounded bg-white py-2 text-sm text-black shadow-xl">
          <Menu.Item
            as="button"
            className="mx-2 flex h-8 items-center gap-x-4 rounded px-2 hover:bg-neutral-100"
          >
            <IconSettings size={20} className="stroke-1 text-neutral-500" />
            <p className="text-neutral-800">Settings</p>
          </Menu.Item>
          <Menu.Item
            as="button"
            className="mx-2 flex h-8 items-center gap-x-4 rounded px-2 hover:bg-neutral-100"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <IconLogout size={20} className="stroke-1 text-neutral-500" />
            <p className="text-neutral-800">Logout</p>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ProfileMenu;
