"use client";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers3,
  Compass,
  BookCopy,
  PlusSquare,
  GraduationCap,
  FolderKanban,
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
      label: "Users",
      Icon: Users,
      path: "/users",
    },
    {
      label: "Programs",
      Icon: BookOpen,
      children: [
        {
          label: "Programs",
          href: "/programs",
        },
        {
          label: "Add Program",
          href: "/programs/add",
        },
      ],
    },
    {
      label: "Tracks",
      Icon: Layers3,
      children: [
        {
          label: "Tracks",
          href: "/tracks",
        },
        {
          label: "Add Track",
          href: "/tracks/add",
        },
      ],
    },
    {
      label: "Frameworks",
      Icon: FolderKanban,
      children: [
        {
          label: "Frameworks",
          href: "/frameworks",
        },
        {
          label: "Add Framework",
          href: "/frameworks/add",
        },
      ],
    },
    {
      label: "Roadmaps",
      Icon: Compass,
      children: [
        {
          label: "Roadmaps",
          href: "/roadmaps",
        },
        {
          label: "Add Roadmap",
          href: "/roadmaps/add",
        },
      ],
    },
    {
      label: "Courses",
      Icon: GraduationCap,
      path: "/courses",
    },
  ];

  const IsActiveItem = ({ path }: { path: string }) => {
    const pathname = usePathname();
    return pathname === path;
  };

  return { sidebarItems, IsActiveItem };
};
