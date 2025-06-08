"use client";
import DataTable from "@/components/dashboard/DataTable";
import React, { useEffect, useState } from "react";
import { useColumns } from "./columns";
import { useSearchParams } from "next/navigation";
import MainTitle from "@/components/shared/MainTitle";
import { useGetAllSectionsQuery } from "@/redux/features/section/sectionApi";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useGetAllTrackQuery } from "@/redux/features/track/trackApi";
import { useGetAllframworkQuery } from "@/redux/features/framwork/framworkApi";

type Props = {};

function page({}: Props) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllframworkQuery({ page });
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
        title="framework Managements"
        description="Details of framework information and status"
        children={
          <Link href="/frameworks/add">
            <Button size="lg" className="flex items-center gap-2">
              <PlusIcon />
              Add New framework
            </Button>
          </Link>
        }
      />
      <DataTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        columns={columns}
        pagination={{
          baseUrl: "/frameworks",
          currentPage: data?.data?.currentPage ?? 1,
          totalPages: data?.data?.totalPages ?? 1,
        }}
      />
    </section>
  );
}

export default page;
