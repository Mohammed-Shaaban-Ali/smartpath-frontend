"use client";
import { ICounts } from "@/types/dashboard";
import { motion } from "framer-motion";
import {
  ArrowUpRightIcon,
  Crown,
  Book,
  Users,
  MessageSquare,
  Layers3,
} from "lucide-react";

function StatsCards({
  counts,
  isLoading,
}: {
  counts: ICounts;
  isLoading: boolean;
}) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };

  const cards = [
    {
      title: "Total Users",
      value: counts?.users,
      subtitle: "users",
      bgcolor: "bg-blue-500",
      arrowColor: "text-blue-500",
      icon: Users,
    },
    {
      title: "Total Courses",
      value: counts?.courses,
      subtitle: "courses",
      bgcolor: "bg-green-500",
      arrowColor: "text-green-500",
      icon: Book,
    },
    {
      title: "Total Tracks",
      value: counts?.tracks,
      subtitle: "tracks",
      bgcolor: "bg-purple-500",
      arrowColor: "text-purple-500",
      icon: Layers3,
    },
    {
      title: "Total Messages",
      value: counts?.messages,
      subtitle: "messages",
      bgcolor: "bg-yellow-500",
      arrowColor: "text-yellow-500",
      icon: MessageSquare,
    },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          {isLoading ? <SkeletonCard /> : <StatCard {...card} />}
        </motion.div>
      ))}
    </section>
  );
}

export default StatsCards;

export function StatCard({
  title,
  value,
  subtitle,
  bgcolor,
  arrowColor,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  bgcolor: string;
  arrowColor: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-end justify-between gap-2 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300 hover:bg-gray-50">
      <div className="flex flex-col gap-2">
        <div
          className={`p-1 flex items-center justify-center w-fit rounded-full ${bgcolor}`}
        >
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div>
          <span className="text-black/60 text-18 mt-3">{title}</span>
          <div className="flex items-end gap-1 -mt-2">
            <span className="text-32 font-bold flex items-center gap-2">
              {value}
            </span>
            <span className="text-14 text-black/50 pb-[4px]">{subtitle}</span>
          </div>
        </div>
      </div>
      <ArrowUpRightIcon className={`h-5 w-5 ${arrowColor}`} />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex items-end justify-between gap-2 p-4 border border-gray-200 rounded-xl animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="p-2 w-8 h-8 bg-gray-200 rounded-full" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="flex items-end gap-1 mt-1">
          <div className="h-6 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-8 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="h-5 w-5 bg-gray-200 rounded" />
    </div>
  );
}
