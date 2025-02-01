"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive } from "../../utils/isActive";
import { SidebarItemProp } from "./definitions/sidebar-item-prop.definition";

export default function SidebarItem({
  icon: Icon,
  href,
  label,
}: SidebarItemProp) {
  const pathname = usePathname();
  const active = isActive(pathname, href);
  return (
    <Link
      href={href}
      className={clsx(
        "p-4 flex items-center space-x-2 hover:bg-slate-300",
        active && "bg-sky-200 hover:bg-sky-300 border-r-4 border-blue-500"
      )}
    >
      <Icon size={22} color={active ? "#3e9392" : "#000"} />
      <span
        className={clsx(
          active
            ? "text-sky-700 hover:text-sky-800"
            : "text-slate-500 text-sm hover:text-slate-600"
        )}
      >
        {label}
      </span>
    </Link>
  );
}
