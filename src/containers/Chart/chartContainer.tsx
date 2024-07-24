"use client";

import PayInBar from "@/components/chart/barChart/myBar";
import MyDoughnut from "@/components/chart/doughnoughtChart/myDoughnout";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import MyBarChart from "./myBarChart";
import MyPieChart from "./MyPieChart";

const ChartContainer = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-between  gap-4 w-full">
      <MyBarChart />
      <MyPieChart />
    </div>
  );
};
export default ChartContainer;
