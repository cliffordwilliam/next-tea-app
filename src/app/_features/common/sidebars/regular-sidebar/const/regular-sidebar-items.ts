import { Coffee, ReceiptText } from "lucide-react";
import { SidebarItemProp } from "../../sidebar-item/definitions/sidebar-item-prop.definition";

export const sidebarItems: SidebarItemProp[] = [
  { icon: Coffee, label: "Teas", href: "/teas" },
  { icon: ReceiptText, label: "Activity", href: "#" },
];
