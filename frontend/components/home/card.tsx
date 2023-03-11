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
        "relative flex h-[280px] w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-[rgba(255,255,255,0.15)]",
        "group-hover:after:opacity-100",
        "hover:before:opacity-100",
        "after:gradient-radial-after after:z-[1]",
        "before:gradient-radial-before before:z-[3]",
        "after:absolute after:top-0 after:left-0 after:h-full after:w-full after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500",
        "before:absolute before:top-0 before:left-0 before:h-full before:w-full before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-500"
      )}
    >
      <div className="absolute inset-[1px] z-[2] flex grow flex-col rounded-[inherit] bg-neutral-900 py-6">
        <div className="relative z-[1] flex h-full w-full flex-col justify-end px-6">
          <div className="absolute left-1/2 top-[-10%] h-[172px] w-[323px] -translate-x-1/2">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={323}
              height={200}
              className="h-auto w-[323px]"
            />
          </div>
          <div className="flex flex-initial flex-row items-start gap-x-3">
            {icon}
            <div>
              <h3 className="font-semibold">{title}</h3>
              <h4 className="mt-2 min-h-[48px] text-sm font-medium text-gray-400">
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
