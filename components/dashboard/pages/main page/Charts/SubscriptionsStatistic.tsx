"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { IUsersVSUsersEnrolled } from "@/types/dashboard";

type Props = {
  data: IUsersVSUsersEnrolled[] | undefined;
  isLoading: boolean;
};

function SubscriptionsStatistic({ data, isLoading }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="min-h-[300px] col-span-3 flex flex-col gap-1.5 overflow-hidden"
    >
      <h3 className="text-16 font-semibold ps-1.5">Courses statistics</h3>
      <div className="h-full w-full p-3 border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300 flex flex-col gap-3">
        <div className="w-full flex items-center gap-4 justify-between">
          <h5 className="text-14 font-semibold text-black/40">
            All Users VS Enrolled Users
          </h5>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#7F56D9]" />
              <span className="text-14 font-semibold text-black/40">
                All Users
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#5FA5FF]" />
              <span className="text-14 font-semibold text-black/40">
                Enrolled Users
              </span>
            </div>
          </div>
        </div>

        {isLoading || !data ? (
          <div className="flex flex-col gap-4 w-full h-[240px] animate-pulse">
            <div className="h-5 w-1/4 bg-gray-200 rounded" />
            <div className="flex-1 bg-gray-200 rounded" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis />
              <Tooltip />
              <Area
                dataKey="enrolledUsers"
                type="natural"
                fill="#5FA5FF"
                fillOpacity={0.4}
                stroke="#5FA5FF"
                stackId="a"
              />
              <Area
                dataKey="totalUsers"
                type="natural"
                fill="#7F56D9"
                fillOpacity={0.4}
                stroke="#7F56D9"
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.section>
  );
}

export default SubscriptionsStatistic;
