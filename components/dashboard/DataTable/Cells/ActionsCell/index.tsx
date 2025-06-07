"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ActionsCell({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="h-8 w-8 max-w-8  border border-gray-200 hover:border-gray-200 mr-auto rounded-md hover:bg-gray-200/70 transition-all duration-300 flex items-center  justify-center">
          <span className="text-[20px] font-semibold">⋮</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] flex flex-col gap-1 p-2">
        {children}
      </PopoverContent>
    </Popover>
  );
}
