"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { SidebarItem, SidebarItems } from "./SidebarItems";
import { ChevronDown } from "lucide-react";

import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
export function Sidebar() {
  const { IsActiveItem, sidebarItems } = SidebarItems();

  return (
    <>
      <aside className="hidden lg:flex w-64  h-screen flex-col gap-2 border-r border-gray-200 ">
        <div className="relative border-b border-gray-200 h-[60px] w-full p-3 ">
          <div className="h-10 w-full bg-red-200 "></div>
        </div>
        <section className="p-4 flex flex-col gap-2.5">
          {sidebarItems?.map((item: SidebarItem, index) => {
            const isActive = IsActiveItem({ path: item.path ?? "" });
            const className = isActive
              ? "bg-primary-dark hover:bg-primary-dark/80 hover:text-white text-white"
              : "hover:bg-primary-dark/20";
            return !item.children && item.path ? (
              <Link href={item.path} key={item.path || index}>
                <Button
                  variant="ghost"
                  className={`w-full h-12 justify-start gap-2 rounded-xl transition-all duration-500 ${className}`}
                >
                  <item.Icon />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ) : (
              <SidebarItemWithChildren
                IsActiveItem={IsActiveItem}
                key={index}
                item={item}
              />
            );
          })}
        </section>
      </aside>
    </>
  );
}

function SidebarItemWithChildren({
  item,
  IsActiveItem,
}: {
  item: SidebarItem;
  IsActiveItem: (props: { path: string }) => boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const isActive = item.children?.some((child) =>
    IsActiveItem({ path: child.href })
  );

  // Auto-open the collapsible if a child item is active
  useEffect(() => {
    if (isActive) {
      setIsOpen(true);
    }
  }, [isActive]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full h-12 justify-between rounded-xl transition-all duration-300",
            isActive
              ? "text-primary-dark hover:text-primary-dark hover:bg-primary-dark/10 bg-primary-dark/10 font-medium"
              : ""
          )}
        >
          <div className="flex items-center gap-2">
            <item.Icon />
            <span>{item.label}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              isOpen && "transform rotate-180"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="animate-collapsible-down">
        <div className="pl-4 flex flex-col gap-2 mt-2 ml-4 border-l-2 border-l-gray-300">
          {item.children?.map((child, index) => (
            <Link href={child.href} key={child.href || index}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full h-10 justify-start text-sm rounded-xl transition-all duration-300",
                  "animate-fade-in",
                  IsActiveItem({ path: child.href })
                    ? "bg-primary-dark hover:bg-primary-dark/80 hover:text-white text-white font-medium"
                    : "hover:bg-primary-dark/20"
                )}
              >
                <span>{child.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
