import { cn } from "@lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;

  icon: ReactNode;
  imageSrc: string;
  imageAlt: string;
};

function Card({ title, description, icon, imageSrc, imageAlt }: Props) {
  return (
    <li
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={cn(
        "card",
        "relative flex h-[260px] w-full cursor-pointer flex-col rounded-xl bg-[rgba(255,255,255,0.15)]",
        "group-hover:after:opacity-100",
        "hover:before:opacity-100",
        "after:gradient-radial-after after:z-[1]",
        "before:gradient-radial-before before:z-[3]",
        "after:absolute after:top-0 after:left-0 after:h-full after:w-full after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500",
        "before:absolute before:top-0 before:left-0 before:h-full before:w-full before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-500"
      )}
    >
      <div className="absolute inset-[1px] z-[2] flex grow flex-col rounded-[inherit] bg-neutral-900 p-3">
        <div className="flex h-36 items-center justify-center overflow-hidden">
          {/* <Image
            src={imageSrc}
            alt={imageAlt}
            width={200}
            height={100}
            className=""
          /> */}
        </div>
        <div className="flex grow items-center justify-start px-5">
          <div className="flex items-start gap-3">
            {icon}
            <div>
              <h3 className="font-semibold">{title}</h3>
              <h4 className="mt-2 text-sm font-medium text-gray-400">
                {description}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
