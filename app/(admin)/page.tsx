"use client";

import React from "react";
import Charts from "@/components/dashboard/pages/main page/Charts";
import StatsCards from "@/components/dashboard/pages/main page/StatsCards";
import { motion } from "framer-motion";
import { useGetHomeDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import LastInCourses from "@/components/dashboard/pages/main page/LastInCourses/page";
type Props = {};

function page({}: Props) {
  const { data, isLoading } = useGetHomeDashboardStatsQuery();
  return (
    <section className=" flex flex-col gap-8 p-2 ">
      {/* stats */}
      <StatsCards
        counts={
          data?.data?.counts ?? { users: 0, courses: 0, messages: 0, tracks: 0 }
        }
        isLoading={isLoading}
      />
      {/* charts */}
      <Charts data={data?.data} isLoading={isLoading} />
      {/* table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}
        className="min-h-[300px] col-span-1
        flex flex-col gap-1.5
        overflow-hidden
  "
      >
        <h3 className="text-16 font-semibold ps-1.5">Latest Courses </h3>
        <LastInCourses />
      </motion.section>
    </section>
  );
}

export default page;
