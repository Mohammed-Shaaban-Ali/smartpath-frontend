import { ActionsCell } from "@/components/dashboard/DataTable/Cells/ActionsCell";

import { ISection } from "@/types/sections";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const useColumns = () => {
  const columns: ColumnDef<ISection>[] = [
    {
      header: "Index",
      accessorKey: "id",
      cell: ({ row }) => {
        return <span>{row.index + 1}</span>;
      },
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Icon",
      accessorKey: "icon",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Image
              src={row.original.icon}
              alt={row.original.title}
              width={200}
              height={200}
              className=" w-[160px]"
            />
          </div>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => {
        return (
          <ActionsCell>
            <span>asss</span>
          </ActionsCell>
        );
      },
    },
  ];
  return columns;
};
