import { ActionsCell } from "@/components/dashboard/DataTable/Cells/ActionsCell";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useDeleteroadmapMutation } from "@/redux/features/roadmap/roadmapApi";
import { IRoadmap } from "@/types/roadmap";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const useColumns = () => {
  const columns: ColumnDef<IRoadmap>[] = [
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
              className=" w-[160px] min-h-[100px] rounded-md border border-black object-cover"
            />
          </div>
        );
      },
    },
    {
      header: "Roadmap",
      accessorKey: "link",
      cell: ({ row }) => {
        const link = row.original.link;

        return (
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 transition-all duration-300 "
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span className="font-medium">View Roadmap</span>
              </div>
            </Button>
          </Link>
        );
      },
    },
    {
      header: "Truck Name",
      accessorKey: "Truck.title",
      cell: ({ row }) => {
        return (
          <span className="font-semibold">{row.original.track?.title}</span>
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
        const [deleted, { isLoading }] = useDeleteroadmapMutation();
        return (
          <ActionsCell>
            {/* update  */}
            <Link href={`/roadmaps/${row.original._id}`}>
              <Button variant="ghost" className="w-full" size={"lg"}>
                <Pencil className="h-4 w-4" />
                Eidt
              </Button>
            </Link>
            <DeleteDialog
              deleteFunction={deleted}
              id={row.original._id}
              isDeleting={isLoading}
              title={"Are you sure you want to delete this roadmap?"}
            />
          </ActionsCell>
        );
      },
    },
  ];
  return columns;
};
