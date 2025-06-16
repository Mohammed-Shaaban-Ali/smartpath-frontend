"use client";
import DataTable from "@/components/dashboard/DataTable";
import React, { useEffect, useState } from "react";
import { useColumns } from "./columns";
import { useSearchParams } from "next/navigation";

import { useGetAllcoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {};

function LastInCourses({}: Props) {
  const { data, isLoading } = useGetAllcoursesQuery({ page: 1, limit: 5 });
  const columns = useColumns();

  return (
    <DataTable
      data={data?.data?.items ?? []}
      isLoading={isLoading}
      columns={columns}
    />
  );
}

export default LastInCourses;
