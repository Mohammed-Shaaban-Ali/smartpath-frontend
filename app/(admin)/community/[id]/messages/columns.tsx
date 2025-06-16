import { ActionsCell } from "@/components/dashboard/DataTable/Cells/ActionsCell";
import StatusCell from "@/components/dashboard/DataTable/Cells/StatusCell";
import { ShowUserCourses } from "@/components/dialog/ShowUserCourses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleReqWithToaster } from "@/lib/handle-req-with-toaster";
import { formatDate } from "@/lib/utils";
import { useUpdateBlockUserMutation } from "@/redux/features/user/userApi";
import { IMessage } from "@/types/community";
import { IUser } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const useColumns = () => {
  const columns: ColumnDef<IMessage>[] = [
    {
      header: "ID",
      accessorKey: "_id",
    },
    {
      header: "Student",
      accessorKey: "student",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 ">
              <AvatarImage
                src={row.original.sender?.avatar}
                alt={row.original.sender?.name}
              />
              <AvatarFallback>
                {row.original.sender?.name?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-0">
              <span className="font-semibold">{row.original.sender?.name}</span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Blocked Student",
      accessorKey: "isBlocked",
      cell: ({ row }) => {
        const [updateBlock, { isLoading }] = useUpdateBlockUserMutation();
        const handleUpdateBlock = async () => {
          handleReqWithToaster("Loading....", async () => {
            await updateBlock(row.original._id);
          });
        };

        return (
          <StatusCell
            status={row.original.sender?.isBlocked ? "inactive" : "active"}
            disabled={isLoading}
            onclick={handleUpdateBlock}
            title={row.original.sender?.isBlocked ? "Blocked" : "active"}
          />
        );
      },
    },

    {
      header: "Message",
      accessorKey: "message",
      cell: ({ row }) => {
        return (
          <div className="font-semibold flex flex-col gap-1.5 max-w-[300px] max-h-[400px] overflow-y-auto ">
            {row.original.image && (
              <div>
                <Image
                  width={200}
                  height={200}
                  src={row.original.image}
                  alt={row.original.content}
                  className="w-[100px] h-[100px] rounded-md object-cover"
                />
              </div>
            )}
            <span className="p-2.5 rounded-md text-center  bg-gray-50 ">
              {row.original.content}
            </span>
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
  ];
  return columns;
};
