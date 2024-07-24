"use client";
import { transactionItem } from "@/types/home";
import { useInView, motion } from "framer-motion";
import Image from "next/image";
import { FC, useRef } from "react";

const TransactionCard: FC<transactionItem> = ({
  title,
  amount,
  img,
  noOfTransaction,
  percent,
  status,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="strip-data-card rounded-[30px] flex flex-col gap-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-start items-center gap-6">
        <motion.div
          className="flex justify-center items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={`/totalmerchants.svg`}
            width={50}
            height={50}
            alt={"Total Merchants"}
            className="bg-primary p-2 rounded-full"
          />
        </motion.div>

        <div className="">
          <div className="font-bold">
            <p className="text-[16px]">{title}</p>
            <p className="text-[24px]"> {`₹ ${amount || 0}`}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-around items-center gap-6">
        <div className="flex flex-col gap-2  ">
          <p className="font-semibold text-[12px]">No of Transactions</p>
          <div className="border rounded-full">
            <p className="text-center text-[14px] font-bold p-1">
              {noOfTransaction || 0}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2  ">
          <p className="font-semibold text-[12px]">Last Month</p>
          <div className="border rounded-full flex gap-1 p-1">
            {status === "increase" ? (
              <Image
                src={`/greenuparrow.svg`}
                width={25}
                height={25}
                alt={"Total Merchants"}
                className="bg-[#3D3E40] p-1 rounded-full"
              />
            ) : // <object type="image/svg+xml" data="/up_arrow.svg">
            //   svg-animation
            // </object>
            status === "decrease" ? (
              <Image
                src={`/reddownarrow.svg`}
                width={25}
                height={25}
                alt={"Total Merchants"}
                className="bg-[#3D3E40] p-1 rounded-full"
              />
            ) : null}

            <p
              className={`${
                status === "increase"
                  ? "text-success-color"
                  : status === "decrease"
                  ? "text-error-color"
                  : null
              } font-bold text-[14px]`}
            >{`${percent || 0} %`}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
