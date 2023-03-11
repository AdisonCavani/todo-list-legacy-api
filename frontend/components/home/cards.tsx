"use client";

import Card from "./card";
import Image1 from "@images/1.png";
import Image2 from "@images/2.png";
import Image3 from "@images/3.png";
import Image4 from "@images/4.png";
import Image5 from "@images/5.png";
import Image6 from "@images/6.png";
import { cn } from "@lib/utils";
import {
  IconArrowsLeftRight,
  IconCircleDashed,
  IconMap,
  IconPencil,
  IconPlayerRecordFilled,
  IconTableFilled,
} from "@tabler/icons-react";
import type { MouseEventHandler } from "react";

function Cards() {
  const handleOnMouseMove: MouseEventHandler<HTMLUListElement> = (event) => {
    const cards = document.getElementById("cards")
      ?.children as HTMLCollectionOf<HTMLLIElement>;

    for (const card of cards) {
      const rect = card.getBoundingClientRect(),
        x = event.clientX - rect.left,
        y = event.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-50 select-none overflow-visible",
          "before:gradient-radial-overlay before:absolute before:top-1/2 before:left-1/2 before:h-screen before:w-[calc(100vw-50px)] before:-translate-y-1/2 before:-translate-x-1/2 before:opacity-[0.03] before:blur-3xl"
        )}
      />
      <ul
        id="cards"
        onMouseMove={handleOnMouseMove}
        className="group grid grid-cols-1 gap-2 rounded-xl sm:grid-cols-2 lg:grid-cols-3"
      >
        <Card
          title="Issues"
          description="Create new tasks and subtasks in seconds"
          icon={<IconPencil size={18} className="mt-[2px]" />}
          imageSrc={Image1}
          imageAlt=""
        />
        <Card
          title="Real-time Sync"
          description="Synchronized instantly across all users"
          icon={<IconArrowsLeftRight size={18} className="mt-[2px]" />}
          imageSrc={Image2}
          imageAlt=""
        />
        <Card
          title="Cycles"
          description="Don't sprint - build momentum with Cycles"
          icon={<IconPlayerRecordFilled size={18} className="mt-[2px]" />}
          imageSrc={Image3}
          imageAlt=""
        />
        <Card
          title="Projects"
          description="Define larger initiatives and features"
          icon={<IconTableFilled size={18} className="mt-[2px]" />}
          imageSrc={Image4}
          imageAlt=""
        />
        <Card
          title="Roadmaps"
          description="Plan visually with live predictions"
          icon={<IconMap size={18} className="mt-[2px]" />}
          imageSrc={Image5}
          imageAlt=""
        />
        <Card
          title="Backlog"
          description="A place for new issues and ideas"
          icon={<IconCircleDashed size={18} className="mt-[2px]" />}
          imageSrc={Image6}
          imageAlt=""
        />
      </ul>
    </div>
  );
}

export default Cards;
