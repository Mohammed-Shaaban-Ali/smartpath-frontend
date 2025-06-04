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
          label: "Customers",
          href: "/customers",
        },
      ],
    },
    {
      label: "Plans management",
      Icon: List,
      children: [
        {
          label: "Category",
          href: "/category",
        },
        {
          label: "Features",
          href: "/features",
        },
        {
          label: "Duration",
          href: "/duration",
        },
        {
          label: "Plans",
          href: "/plans",
        },
      ],
    },
    {
      label: "Pending Projects",
      Icon: CircleDashed,
      path: "/pending-projects",
    },
    {
      label: "Subscriptions",
      Icon: CalendarDays,
      path: "/subscriptions",
    },
    {
      label: "Coupons",
      Icon: Percent,
      path: "/coupons",
    },
    {
      label: "Invoices",
      Icon: FileText,
      path: "/invoices",
    },
  ];

  const IsActiveItem = ({ path }: { path: string }) => {
    const pathname = usePathname();
    return pathname == path;
  };
  return { sidebarItems, IsActiveItem };
};
