import { ActionsCell } from "@/components/dashboard/DataTable/Cells/ActionsCell";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useDeletecoursesMutation } from "@/redux/features/courses/coursesApi";
import { ICourses } from "@/types/courses";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Pi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const useColumns = () => {
  const columns: ColumnDef<ICourses>[] = [
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
        return (
          <div className="flex items-center gap-2">
            {/* image */}
            <Image
              src={row.original.image}
              alt={row.original.title}
              width={200}
              height={200}
              className=" w-[120px] min-h-[80px] rounded-md border border-black object-cover"
            />
            <span className="font-semibold">{row.original.title}</span>
          </div>
        );
      },
    },

    {
      header: "Enrolled Count",
      accessorKey: "enrolledCount",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 ">
            <span className="font-semibold p-1.5 px-3 rounded-full bg-primary-dark/15 text-black">
              {row.original.enrolledCount}
            </span>
            <span>Enrolled Users</span>
          </div>
        );
      },
    },

    {
      header: "Completed Count",
      accessorKey: "completedCount",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 ">
            <span className="font-semibold p-1.5 px-3 rounded-full bg-gray-100 text-black">
              {row.original.completedCount}
            </span>
            <span>Completed Course</span>
          </div>
        );
      },
    },
    {
      header: "Number Of Sections",
      accessorKey: "numberOfSections",
      cell: ({ row }) => {
        return (
          <span className="font-semibold">
            {row.original.numberOfSections} Sections
          </span>
        );
      },
    },
    {
      header: "Total Duration",
      accessorKey: "totalDuration",
      cell: ({ row }) => {
        return (
          <span className="font-semibold">
            {row.original.totalDuration} Minutes
          </span>
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
        const [deleted, { isLoading }] = useDeletecoursesMutation();
        return (
          <ActionsCell>
            {/* update  */}
            <Link href={`/courses/${row.original._id}`}>
              <Button variant="ghost" className="w-full" size={"lg"}>
                <Pencil className="h-4 w-4" />
                Eidt
              </Button>
            </Link>
            <DeleteDialog
              deleteFunction={deleted}
              id={row.original._id}
              isDeleting={isLoading}
              title={"Are you sure you want to delete this course?"}
            />
          </ActionsCell>
        );
      },
    },
  ];
  return columns;
};
