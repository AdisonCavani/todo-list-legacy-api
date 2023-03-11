import { cn } from "@lib/utils";
import styles from "@styles/card.module.css";
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
    <li className={cn(styles.card, "group-hover:after:opacity-100")}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={320}
              height={160}
              className={styles.image}
            />
          </div>

          <div className={styles.contentWrapper}>
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
