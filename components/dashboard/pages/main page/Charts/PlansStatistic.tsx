"use client";
import React from "react";
import { motion } from "framer-motion";
import { IUsersVSUsersWithRoadmaps } from "@/types/dashboard";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export const description =
  "A stacked bar chart showing total users vs users with roadmaps";

type Props = {
  data: IUsersVSUsersWithRoadmaps[] | undefined;
  isLoading: boolean;
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function PlansStatistic({ data, isLoading }: Props) {
  // Transform your actual data here
  const transformedData = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    // Transform IUsersVSUsersWithRoadmaps data to chart format
    return data.map((item) => ({
      period: item.period,
      totalUsers: item.totalUsers,
      usersWithRoadmaps: item.usersWithRoadmaps,
      usersWithoutRoadmaps: item.totalUsers - item.usersWithRoadmaps,
    }));
  }, [data]);

  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="min-h-[300px] col-span-2 flex flex-col gap-1.5 overflow-hidden"
      >
        <h3 className="text-16 font-semibold ps-1.5">Plans statistics</h3>
        <div className="h-full w-full p-3 border border-gray-200 rounded-xl">
          <div className="animate-pulse bg-gray-200 h-full rounded"></div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className="min-h-[300px] col-span-2 flex flex-col gap-1.5 overflow-hidden"
    >
      <h3 className="text-16 font-semibold ps-1.5">Roadmap statistics</h3>
      <div className="h-full w-full p-3 border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300 flex flex-col gap-3">
        <h5 className="text-14 font-semibold text-black/40">
          Total Users Vs Users With Roadmaps
        </h5>
        <div className="w-full h-64 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={transformedData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="period"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey="usersWithRoadmaps"
                stackId="a"
                fill="#5FA5FF"
                name="Users With Roadmaps"
              />
              <Bar
                dataKey="usersWithoutRoadmaps"
                stackId="a"
                fill="#7F56D9"
                name="Users Without Roadmaps"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.section>
  );
}

export default PlansStatistic;
