import React from "react";
import { motion } from "framer-motion";

type Props = {
  children?: React.ReactNode;
  title: string;
  description: string;
};

function MainTitle({ description, title, children }: Props) {
  return (
    <section className="flex w-full items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="text-18 font-[500]">{title}</h1>
        <p className="text-black/60 text-16">{description}</p>
      </motion.div>

      {children && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}

export default MainTitle;
