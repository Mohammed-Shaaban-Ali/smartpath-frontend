"use client";
import DataTable from "@/components/dashboard/DataTable";
import React, { useEffect, useState } from "react";
import { useColumns } from "./columns";
import { useSearchParams } from "next/navigation";
import MainTitle from "@/components/shared/MainTitle";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { useGetAllGroupQuery } from "@/redux/features/community/communityApi";

type Props = {};

function page({}: Props) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllGroupQuery({ page });
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
        title="Community Managements"
        description="Details of community information and status"
        children={
          <Link href="/community/add">
            <Button size="lg" className="flex items-center gap-2">
              <PlusIcon />
              Add New Community
            </Button>
          </Link>
        }
      />
      <DataTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        columns={columns}
        pagination={{
          baseUrl: "/community",
          currentPage: data?.data?.currentPage ?? 1,
          totalPages: data?.data?.totalPages ?? 1,
        }}
      />
    </section>
  );
}

export default page;
