"use client";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Percent,
  FileText,
  List,
  CircleDashed,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  Icon: React.ElementType;
  path?: string;
  children?: {
    label: string;
    href: string;
  }[];
};

export const SidebarItems = () => {
  const sidebarItems: SidebarItem[] = [
    {
      label: "Dashboard",
      Icon: LayoutDashboard,
      path: "/",
    },

    {
      label: "Users management",
      Icon: Users,
      children: [
        {
          label: "Users",
          href: "/users",
        },
      ],
    },
  ];

  const IsActiveItem = ({ path }: { path: string }) => {
    const pathname = usePathname();
    return pathname == path;
  };
  return { sidebarItems, IsActiveItem };
};
