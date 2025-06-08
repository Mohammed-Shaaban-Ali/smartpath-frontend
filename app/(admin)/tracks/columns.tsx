import { ActionsCell } from "@/components/dashboard/DataTable/Cells/ActionsCell";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useDeleteSectionMutation } from "@/redux/features/section/sectionApi";
import { useDeleteTrackMutation } from "@/redux/features/track/trackApi";

import { ISection } from "@/types/sections";
import { ITrack } from "@/types/track";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Pi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const useColumns = () => {
  const columns: ColumnDef<ITrack>[] = [
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
      cell: ({ row }) => {
        return <span className="font-semibold">{row.original.title}</span>;
      },
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
              className=" w-[260px] min-h-[120px] object-cover"
            />
          </div>
        );
      },
    },
    {
      header: "Icon 3D",
      accessorKey: "icon 3D",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Image
              src={row.original.icon3D}
              alt={row.original.title}
              width={200}
              height={200}
              className=" w-[260px] min-h-[120px] object-cover"
            />
          </div>
        );
      },
    },
    {
      header: "Program Name",
      accessorKey: "title",
      cell: ({ row }) => {
        return (
          <span className="font-semibold">{row.original.section?.title}</span>
        );
      },
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        return formatDate(row.original.createdAt);
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => {
        const [deleted, { isLoading }] = useDeleteTrackMutation();
        return (
          <ActionsCell>
            {/* update  */}
            <Link href={`/tracks/${row.original._id}`}>
              <Button variant="ghost" className="w-full" size={"lg"}>
                <Pencil className="h-4 w-4" />
                Eidt
              </Button>
            </Link>
            <DeleteDialog
              deleteFunction={deleted}
              id={row.original._id}
              isDeleting={isLoading}
              title={"Are you sure you want to delete this track?"}
            />
          </ActionsCell>
        );
      },
    },
  ];
  return columns;
};
