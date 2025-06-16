"use client";
import DataTable from "@/components/dashboard/DataTable";
import React, { useEffect, useState } from "react";
import { useColumns } from "./columns";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import MainTitle from "@/components/shared/MainTitle";
import { useGetAllMessagesQuery } from "@/redux/features/community/communityApi";

type Props = {};

function page({}: Props) {
  const params = useParams();
  const id = params.id as string;
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllMessagesQuery({ page, id });
  const columns = useColumns();

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setPage(parseInt(pageParam));
    } else {
      setPage(1);
    }
  }, [searchParams]);
  return (
    <section className="w-full flex flex-col gap-6">
      <MainTitle
        title="Messages Managements"
        description="Details of messages information and status"
      />
      <DataTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        columns={columns}
        pagination={{
          baseUrl: `/community/${id}/messages`,
          currentPage: data?.data?.currentPage ?? 1,
          totalPages: data?.data?.totalPages ?? 1,
        }}
      />
    </section>
  );
}

export default page;
