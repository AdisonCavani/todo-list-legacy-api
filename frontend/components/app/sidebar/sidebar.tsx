import {
  IconAdjustmentsHorizontal,
  IconCalendar,
  IconChevronsRight,
  IconListCheck,
  IconMenu2,
  IconNote,
  IconPlus,
  IconSearch,
  IconSquareRoundedFilled,
} from "@tabler/icons-react";
import SidebarItem from "./sidebarItem";
import SignoutButton from "./signoutButton";

function Sidebar() {
  return (
    <nav className="flex h-screen flex-col gap-y-4 bg-neutral-100 px-4 py-4">
      <div className="flex justify-between">
        <p className="text-2xl font-bold text-neutral-700">Menu</p>
        <button className="text-neutral-700">
          <IconMenu2 size={22} />
        </button>
      </div>

      <div className="flex items-center gap-x-3 rounded-lg border border-neutral-200 px-2">
        <IconSearch size={18} className="text-neutral-500" />
        <input
          type="text"
          placeholder="Search"
          className="bg-inherit py-2 text-neutral-500 placeholder-neutral-500 outline-none placeholder:font-semibold"
        />
      </div>

      {/* Tasks */}
      <div>
        <p className="mb-2 text-xs font-bold text-neutral-700">TASKS</p>

        <SidebarItem
          href="#"
          icon={<IconChevronsRight size={20} className="text-neutral-500" />}
          text="Upcoming"
          count={12}
        />

        <SidebarItem
          href="#"
          icon={<IconListCheck size={20} className="text-neutral-500" />}
          text="Today"
          count={5}
          isSelected
        />

        <SidebarItem
          href="#"
          icon={<IconCalendar size={20} className="text-neutral-500" />}
          text="Calendar"
        />

        <SidebarItem
          href="#"
          icon={<IconNote size={20} className="text-neutral-500" />}
          text="Sticky Wall"
        />
      </div>

      <hr className="h-[1px] w-full bg-neutral-400" />

      {/* Lists */}
      <div>
        <p className="mb-2 text-xs font-bold text-neutral-700">LISTS</p>

        <SidebarItem
          href="#"
          icon={<IconSquareRoundedFilled size={20} className="text-red-400" />}
          text="Personal"
          count={3}
        />
        <SidebarItem
          href="#"
          icon={<IconSquareRoundedFilled size={20} className="text-cyan-400" />}
          text="Work"
          count={6}
        />
        <SidebarItem
          href="#"
          icon={
            <IconSquareRoundedFilled size={20} className="text-yellow-400" />
          }
          text="List 1"
          count={3}
        />

        <button className="flex w-full items-center gap-x-3 rounded-lg px-3 py-[6px] hover:bg-neutral-200/40">
          <IconPlus size={20} className="text-neutral-500" />
          <p className="text-neutral-800">Add New List</p>
        </button>
      </div>

      <hr className="h-[1px] w-full bg-neutral-400" />

      {/* Tags */}
      <div>
        <p className="mb-2 text-xs font-bold text-neutral-700">TAGS</p>
        <div className="flex gap-x-1">
          <div className="flex items-center justify-center rounded bg-cyan-100 py-1 px-3 text-sm font-semibold text-neutral-700">
            <p>Tag 1</p>
          </div>

          <div className="flex items-center justify-center rounded bg-red-100 px-3 py-1 text-sm font-semibold text-neutral-700">
            <p>Tag 2</p>
          </div>

          <button className="flex items-center justify-center gap-x-1 rounded bg-neutral-200 px-3 py-1 text-sm font-semibold text-neutral-700">
            <IconPlus size={16} />
            <p>Add tag</p>
          </button>
        </div>
      </div>

      <div className="mt-auto mb-2 flex flex-col">
        <button className="flex w-full items-center gap-x-3 rounded-lg px-3 py-[6px] hover:bg-neutral-200/40">
          <IconAdjustmentsHorizontal size={20} className="text-neutral-500" />
          <p className="text-neutral-800">Settings</p>
        </button>
        <SignoutButton />
      </div>
    </nav>
  );
}

export default Sidebar;
