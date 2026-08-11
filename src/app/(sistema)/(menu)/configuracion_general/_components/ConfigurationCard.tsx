import Link from "next/link";

import type { ConfigurationSection } from "../types/configuration-section";
import { CardContent } from "./CardContent";

interface ConfigurationCardProps {
  section: ConfigurationSection;
}

const cardClassName =
  "group block w-full overflow-hidden rounded-[14px] bg-white text-[#3f352f] shadow-[0_3px_8px_rgba(15,23,42,0.14)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#2c1ff3]/35";

export function ConfigurationCard({ section }: ConfigurationCardProps) {
  if (section.action.type === "route") {
    return (
      <Link href={section.action.href} className={cardClassName}>
        <CardContent section={section} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`${cardClassName} cursor-pointer border-0 p-0 font-[inherit]`}
      aria-haspopup="dialog"
      data-modal-id={section.action.modalId}
    >
      <CardContent section={section} />
    </button>
  );
}
