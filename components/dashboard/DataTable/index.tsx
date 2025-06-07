"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TableSkeleton from "./TableSkeleton";
import { CustomPagination } from "./CustomPagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pagination?: {
    totalPages: number;
    currentPage: number;
    baseUrl: string;
  };
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <TableSkeleton />;
  return (
    <div className="w-full border border-gray-100 rounded-xl">
      <div className="overflow-x-auto border-y border-gray-100">
        <table className="w-full min-w-max">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-50 rounded-none">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-b border-r  border-gray-100 text-start py-3 px-4 text-nowrap text-[16px] font-[500] text-black"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="w-full">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  className="hover:bg-gray-50 even:bg-gray-50 bg-white border-b border-gray-100 last:border-b-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    delay: index * 0.03,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-r  text-14 border-gray-100 text-start p-3 text-black/70 first:rounded-s-[14px] last:rounded-e-[14px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-16 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination?.totalPages > 1 && (
        <CustomPagination
          baseUrl={pagination?.baseUrl}
          currentPage={pagination?.currentPage}
          totalPages={pagination?.totalPages}
        />
      )}
    </div>
  );
}
