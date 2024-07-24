// import Image from "next/image";

// function StripComponent() {
//   return (
//     <div className="w-full border-2 border-card-border  bg-background-secondary p-4 shadow-lg rounded-lg box-shadow text-text-primary font-bold  flex justify-center gap-6 items-center">
//       <div className="">
//         <Image
//           src={"/totalmerchants.svg"}
//           width={50}
//           height={50}
//           alt={"."}
//           className="bg-primary p-2 rounded-full"
//         />
//       </div>
//       <div className="">
//         <p className="text-[16px]">Total Merchants</p>
//         <p className="text-[24px]">80</p>
//       </div>
//     </div>
//   );
// }

// export default StripComponent;
"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FC, useRef } from "react";
import { stripItem } from "@/types/home";

const StripComponent: FC<stripItem> = ({ title, amount, img }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className="strip-data-card font-bold rounded-[15px] flex justify-center gap-6 items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="flex justify-center items-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={`/${img}.svg`}
          width={50}
          height={50}
          alt={"Total Merchants"}
          className="bg-primary p-2 rounded-full"
        />
      </motion.div>
      <div className="text-start">
        <p className="text-[16px]">{title}</p>
        <p className="text-[24px]">{amount}</p>
      </div>
    </motion.div>
  );
};

export default StripComponent;
