"use client";
import DataTable from "@/components/dashboard/DataTable";
import React from "react";
import { useColumns } from "./columns";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";

type Props = {};

function page({}: Props) {
  const { data, isLoading } = useGetAllUsersQuery();
  const columns = useColumns();

  return (
    <DataTable
      data={data?.data?.items ?? []}
      isLoading={isLoading}
      columns={columns}
    />
  );
}

export default page;
