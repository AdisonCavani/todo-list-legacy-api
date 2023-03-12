import Cards, { CardsProps } from "@components/home/cards";
import Image1 from "@images/1.png";
import Image2 from "@images/2.png";
import Image3 from "@images/3.png";
import Image4 from "@images/4.png";
import Image5 from "@images/5.png";
import Image6 from "@images/6.png";
import {
  IconArrowsLeftRight,
  IconCircleDashed,
  IconMap,
  IconPencil,
  IconPlayerRecordFilled,
  IconTableFilled,
} from "@tabler/icons-react";

export const metadata = {
  title: "Home",
};

const cards: CardsProps = {
  id: "cards",
  items: [
    {
      title: "Issues",
      description: "Create new tasks and subtasks in seconds",
      imageSrc: Image1,
      imageAlt: "",
      icon: <IconPencil size={18} className="mt-[2px]" />,
    },
    {
      title: "Real-time Sync",
      description: "Synchronized instantly across all users",
      imageSrc: Image2,
      imageAlt: "",
      icon: <IconArrowsLeftRight size={18} className="mt-[2px]" />,
    },
    {
      title: "Cycles",
      description: "Don't sprint - build momentum with Cycles",
      imageSrc: Image3,
      imageAlt: "",
      icon: <IconPlayerRecordFilled size={18} className="mt-[2px]" />,
    },
    {
      title: "Projects",
      description: "Define larger initiatives and features",
      imageSrc: Image4,
      imageAlt: "",
      icon: <IconTableFilled size={18} className="mt-[2px]" />,
    },
    {
      title: "Roadmaps",
      description: "Plan visually with live predictions",
      imageSrc: Image5,
      imageAlt: "",
      icon: <IconMap size={18} className="mt-[2px]" />,
    },
    {
      title: "Backlog",
      description: "A place for new issues and ideas",
      imageSrc: Image6,
      imageAlt: "",
      icon: <IconCircleDashed size={18} className="mt-[2px]" />,
    },
  ],
};

function Page() {
  return (
    <section className="mx-auto my-14 max-w-5xl px-8">
      <div className="mx-auto mb-12 max-w-2xl space-y-6">
        <a
          href="#plan"
          className="bg-gradient-to-r from-yellow-400 to-teal-400 bg-clip-text text-3xl font-bold text-transparent sm:text-5xl"
        >
          Plan
        </a>

        <p className="text-lg text-slate-300">
          Linear is a tool to remove barriers. Powerful yet simple to use, it
          helps you to plan ahead, make better decisions and execute faster. You
          don&apos;t have to come up with best practices for how to use Linear —
          we already built them directly into the product.
        </p>
      </div>

      <Cards {...cards} />
    </section>
  );
}

export default Page;
