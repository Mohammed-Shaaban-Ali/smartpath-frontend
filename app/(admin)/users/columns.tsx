import StatusCell from "@/components/dashboard/DataTable/Cells/StatusCell";
import { ShowUserCourses } from "@/components/dialog/ShowUserCourses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";

export const useColumns = () => {
  const columns: ColumnDef<IUser>[] = [
    {
      header: "ID",
      accessorKey: "_id",
    },
    {
      header: "Name ",
      accessorKey: "name",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 ">
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
              <AvatarFallback>{row.original.name?.slice(0, 1)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-0">
              <span className="font-semibold">{row.original.name}</span>
              <span className="text-[10px] text-gray-500">
                {row.original.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Roadmap",
      accessorKey: "roadmap",
      cell: ({ row }) => {
        return (
          <div className="py-2">
            {row.original.roadmap &&
            row.original.roadmap.trackName &&
            row.original.roadmap.progress ? (
              <div className="space-y-2">
                {/* Track Name */}
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {row.original.roadmap.trackName}
                </div>

                {/* Progress Bar */}
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {row.original.roadmap.progress}%
                    </span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="w-full bg-gray-200 min-w-[130px] rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        parseInt(row.original.roadmap?.progress, 10) >= 80
                          ? "bg-green-500"
                          : parseInt(row.original.roadmap?.progress, 10) >= 50
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, parseInt(row.original.roadmap.progress))
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <StatusCell status={"inactive"} title="No Roadmap" />
            )}
          </div>
        );
      },
    },
    {
      header: "Enrolled Courses",
      accessorKey: "enrolledCourses",
      cell: ({ row }) => {
        return <ShowUserCourses />;
      },
    },
  ];
  return columns;
};
