"use client";

import Card, { CardProps } from "./card";
import { cn } from "@lib/utils";
import type { MouseEventHandler } from "react";

export type CardsProps = {
  id: string;
  items: CardProps[];
};

function Cards({ id, items }: CardsProps) {
  const handleOnMouseMove: MouseEventHandler<HTMLUListElement> = (event) => {
    const cards = document.getElementById(id)
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
    <div className="relative overflow-hidden">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-50 select-none overflow-visible",
          "before:gradient-radial-overlay before:absolute before:top-1/2 before:left-1/2 before:h-screen before:w-[calc(100vw-50px)] before:-translate-y-1/2 before:-translate-x-1/2 before:opacity-[0.03] before:blur-3xl"
        )}
      />
      <ul
        id={id}
        onMouseMove={handleOnMouseMove}
        className="group grid grid-cols-1 gap-2 rounded-xl sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((props, index) => (
          <Card key={index} {...props} />
        ))}
      </ul>
    </div>
  );
}

export default Cards;
