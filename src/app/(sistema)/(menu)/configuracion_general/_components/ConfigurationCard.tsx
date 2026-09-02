import Link from "next/link";

import type { ConfigurationSection } from "../types/configuration-section";
import { CardContent } from "./CardContent";

interface ConfigurationCardProps {
  section: ConfigurationSection;
  onModalOpen?: (modalId: string) => void;
}

const cardClassName =
  "group block w-full overflow-hidden rounded-[10px] bg-white text-[#3f352f] shadow-[0_2px_6px_rgba(15,23,42,0.12)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,23,42,0.16)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#2c1ff3]/35";

export function ConfigurationCard({
  section,
  onModalOpen,
}: ConfigurationCardProps) {
  if (section.action.type === "route") {
    return (
      <Link href={section.action.href} className={cardClassName}>
        <CardContent section={section} />
      </Link>
    );
  }

  const modalId = section.action.modalId;

  return (
    <button
      type="button"
      className={`${cardClassName} cursor-pointer border-0 p-0 font-[inherit]`}
      aria-haspopup="dialog"
      data-modal-id={modalId}
      onClick={() => onModalOpen?.(modalId)}
    >
      <CardContent section={section} />
    </button>
  );
}
