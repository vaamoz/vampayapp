// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const PayInBar = () => {
//   const labels = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: "",
//         data: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
//         backgroundColor: "#8E7AB5",
//         borderColor: "#8E7AB5",
//         borderWidth: 1,
//         borderRadius: 5,
//         barPercentage: 1,
//         borderSkipped: false,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         grid: {
//           display: false,
//           ticks: false,
//           drawborder: false,
//           drawOnChartArea: false,
//           borderWidth: 1,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         border: {
//           display: false,
//           drawBorder: false,
//           dash: [4, 4],
//         },
//       },
//     },

//     plugins: {
//       legend: {
//         display: false,
//       },
//     },

//     elements: {
//       bar: {
//         borderRadius: 10,
//       },
//     },
//   };

//   return (
//     <div className="">
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default PayInBar;

import React, { FC } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart elements and scales
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PayInBarProps {
  labels?: string[];
  barData?: number[];
  backgroundColor?: string;
  borderColor?: string;
}

const PayInBar: FC<PayInBarProps> = ({
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  barData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  backgroundColor = "#8E7AB5",
  borderColor = "#8E7AB5",
}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: barData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 1,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
          ticks: false,
          drawborder: false,
          drawOnChartArea: false,
          borderWidth: 1,
        },
      },
      y: {
        beginAtZero: true,
        border: {
          display: false,
          drawBorder: false,
          dash: [4, 4],
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      bar: {
        borderRadius: 10,
      },
    },
  };

  return (
    <div className="">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PayInBar;
