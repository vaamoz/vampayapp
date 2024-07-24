"use client";
import { useEffect, useRef } from "react";
import Chart, { ChartConfiguration, ChartData, Plugin } from "chart.js/auto";

export interface MyDoughnutProps {
  salesData?: number[];
  backgroundColors?: string[];
  borderColors?: string[];
}

const MyDoughnut: React.FC<MyDoughnutProps> = ({
  salesData = [0, 0, 0],
  backgroundColors = ["#8E7AB5", "#D1BAFF", "#FF6D6D"],
  borderColors = ["#8E7AB5", "#D1BAFF", "#FF6D6D"],
}) => {
  const chartRef = useRef<Chart<"doughnut"> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const data: ChartData<"doughnut"> = {
      datasets: [
        {
          label: "Monthly Sales",
          data: salesData,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };

    // Define plugin for custom behavior
    const SliceThickness: Plugin<"doughnut"> = {
      id: "sliceThickness",
      beforeDraw(chart) {
        const thicknesses = [230, 250, 270];
        const meta = chart.getDatasetMeta(0);
        if (meta) {
          meta.data.forEach((element, index) => {
            const thickness = thicknesses[index % thicknesses.length];
            const arc = element as any; // Cast element to any to access outerRadius
            arc.outerRadius = (chart.chartArea.width / thickness) * 100;
          });
        }
      },
    };

    const config: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data: data,
      options: {},
      plugins: [SliceThickness],
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, config);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [salesData, backgroundColors]); // Update the chart when salesData or backgroundColors change

  return (
    <div className="">
      <canvas ref={canvasRef} id="myChart" />
    </div>
  );
};

export default MyDoughnut;
