import { ActionsCell } from "@/components/dashboard/DataTable/Cells/ActionsCell";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import { useDeleteSectionMutation } from "@/redux/features/section/sectionApi";

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
        const [deleted, { isLoading }] = useDeleteSectionMutation();
        return (
          <ActionsCell>
            <DeleteDialog
              deleteFunction={deleted}
              id={row.original._id}
              isDeleting={isLoading}
              title={"Are you sure you want to delete this section?"}
            />
          </ActionsCell>
        );
      },
    },
  ];
  return columns;
};
