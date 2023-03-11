"use client";

import Card from "./card";
import { cn } from "@lib/utils";
import { IconPencil } from "@tabler/icons-react";
import type { MouseEventHandler } from "react";

function Cards() {
  const handleOnMouseMove: MouseEventHandler<HTMLUListElement> = (event) => {
    const cards = document.getElementsByClassName(
      "card"
    ) as HTMLCollectionOf<HTMLDivElement>;

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
          "before:gradient-radial-overlay before:absolute before:top-1/2 before:left-1/2 before:h-screen before:w-[calc(100vw-50px)] before:-translate-y-1/2 before:-translate-x-1/2 before:opacity-5 before:blur-3xl"
        )}
      />
      <ul
        onMouseMove={handleOnMouseMove}
        className="group grid grid-cols-1 gap-2 rounded-xl sm:grid-cols-2 lg:grid-cols-3"
      >
        <Card
          title="Issues"
          description="Create new tasks and subtasks in seconds"
          icon={<IconPencil size={20} />}
          imageSrc=""
          imageAlt=""
        />
        <Card
          title="Real-time Sync"
          description="Synchronized instantly across all users"
          icon={<></>}
          imageSrc=""
          imageAlt=""
        />
        <Card
          title="Cycles"
          description="Don't sprint - build momentum with Cycles"
          icon={<></>}
          imageSrc=""
          imageAlt=""
        />
        <Card
          title="Projects"
          description="Define larger initiatives and features"
          icon={<></>}
          imageSrc=""
          imageAlt=""
        />
        <Card
          title="Roadmaps"
          description="Plan visually with live predictions"
          icon={<></>}
          imageSrc=""
          imageAlt=""
        />
        <Card
          title="Backlog"
          description="A place for new issues and ideas"
          icon={<></>}
          imageSrc=""
          imageAlt=""
        />
      </ul>
    </div>
  );
}

export default Cards;
