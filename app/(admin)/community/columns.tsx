import { ActionsCell } from "@/components/dashboard/DataTable/Cells/ActionsCell";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useDeleteGroupMutation } from "@/redux/features/community/communityApi";
import { useDeletecoursesMutation } from "@/redux/features/courses/coursesApi";
import { IGroup } from "@/types/community";
import { ColumnDef } from "@tanstack/react-table";
import { MessageCircleCode, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const useColumns = () => {
  const columns: ColumnDef<IGroup>[] = [
    {
      header: "Index",
      accessorKey: "id",
      cell: ({ row }) => {
        return <span>{row.index + 1}</span>;
      },
    },
    {
      header: "Community Name",
      accessorKey: "title",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            {/* image */}
            <Image
              src={row.original.image}
              alt={row.original.name}
              width={200}
              height={200}
              className=" w-[120px] min-h-[80px] rounded-md border border-black object-cover"
            />
            <span className="font-semibold">{row.original.name}</span>
          </div>
        );
      },
    },

    {
      header: "Users Count",
      accessorKey: "usersCount",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 ">
            <span className="font-semibold p-1.5 px-3 rounded-full bg-primary-dark/15 text-black">
              {row.original.usersCount}
            </span>
            <span>Users Count</span>
          </div>
        );
      },
    },

    {
      header: "Messages Count",
      accessorKey: "messagesCount",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 ">
            <span className="font-semibold p-1.5 px-3 rounded-full bg-gray-100 text-black">
              {row.original.messagesCount}
            </span>
            <span>Messages Count</span>
          </div>
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
        const [deleted, { isLoading }] = useDeleteGroupMutation();
        return (
          <ActionsCell>
            <Link href={`/community/${row.original._id}/messages`}>
              <Button variant="ghost" className="w-full" size={"lg"}>
                <MessageCircleCode className="h-4 w-4" />
                Messages
              </Button>
            </Link>
            {/* update  */}
            <Link href={`/community/${row.original._id}`}>
              <Button variant="ghost" className="w-full" size={"lg"}>
                <Pencil className="h-4 w-4" />
                Eidt
              </Button>
            </Link>

            <DeleteDialog
              deleteFunction={deleted}
              id={row.original._id}
              isDeleting={isLoading}
              title={"Are you sure you want to delete this community?"}
            />
          </ActionsCell>
        );
      },
    },
  ];
  return columns;
};
