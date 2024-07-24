"use client";
import StripComponent from "@/components/strips/stripCard";
import { stripRow } from "@/types/home";
import { motion, useInView } from "framer-motion";
import { FC, useRef } from "react";

const StripContainer: FC<stripRow> = ({ header, items }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className=" flex flex-col gap-2 text-text-primary">
      <motion.div
        ref={ref}
        className=" "
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="font-semibold text-[24px]">{header}</p>
      </motion.div>

      <div className="flex gap-4 ">
        {items.map((item, index) => (
          <StripComponent key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default StripContainer;
