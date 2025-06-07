"use client";
import type React from "react";
import { motion } from "framer-motion";
const TableSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full overflow-x-auto mt-5"
    >
      <div className="space-y-2 border-t border-gray-100">
        {[...Array(5)].map((_, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: index * 0.03,
            }}
            key={index}
            className="px-6 py-2 h-12  bg-gray-100 rounded animate-pulse"
          ></motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TableSkeleton;
