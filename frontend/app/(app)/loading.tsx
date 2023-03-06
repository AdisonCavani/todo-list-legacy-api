import { IconStarFilled } from "@tabler/icons-react";

function Loading() {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div className="h-7 w-14 animate-pulse rounded-md bg-neutral-200" />

        <div className="h-9 w-20 animate-pulse rounded-md bg-neutral-200" />
      </div>

      <div className="mb-2 flex items-center justify-end gap-x-3">
        <div className="h-6 w-52 animate-pulse rounded-md bg-neutral-200" />
      </div>

      <ul className="flex flex-col gap-y-2">
        {[...Array(8).keys()].map((index) => (
          <li
            key={index}
            className="flex flex-row items-center gap-x-2 rounded-md bg-white px-4 shadow-ms"
          >
            <div className="ml-[6px] min-h-[18px] min-w-[18px] animate-pulse cursor-pointer appearance-none rounded-full bg-neutral-200" />

            <div className="flex min-h-[52px] w-full flex-col justify-center py-2 px-4">
              <div className="h-3 w-48 animate-pulse rounded-full bg-neutral-200" />
            </div>

            <div>
              <IconStarFilled
                size={18}
                className="animate-pulse text-neutral-200"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Loading;
