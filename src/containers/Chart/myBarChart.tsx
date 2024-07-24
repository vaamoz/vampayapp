"use client";

// import PayInBar from "@/components/chart/barChart/myBar";
// import MyDoughnut from "@/components/chart/doughnoughtChart/myDoughnout";
// import { Button, IconButton, Menu, MenuItem } from "@mui/material";
// import Image from "next/image";
// import { useState } from "react";

// const MyBarChart = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [duraion, setDuration] = useState("Weekly");
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className="flex lg:flex-row flex-col justify-between  gap-4 xl:w-1/2">
//       <div className="strip-data-card rounded-2xl   flex flex-col gap-3 justify-between ">
//         <div className="text-text-primary flex justify-between items-center w-full">
//           <p className="text-[20px] font-bold">Payin Transaction Ratio</p>
//           <div className="flex justify-between gap-2">
//             <div className="border-2 border-border-color-primary rounded-full px-4 flex justify-center items-center ">
//               <p className=" font-medium text-text-primary">{duraion}</p>
//             </div>
//             <div className="border-2 border-border-color-primary rounded-full">
//               <IconButton
//                 color="primary"
//                 id="basic-button"
//                 aria-controls={open ? "basic-menu" : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? "true" : undefined}
//                 onClick={handleClick}
//               >
//                 <Image src={"/filter.svg"} width={20} height={20} alt={"."} />
//               </IconButton>
//               <Menu
//                 id="basic-menu"
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 MenuListProps={{
//                   "aria-labelledby": "basic-button",
//                 }}
//               >
//                 <MenuItem onClick={handleClose}>Weekly</MenuItem>
//                 <MenuItem onClick={handleClose}>Monthly</MenuItem>
//                 <MenuItem onClick={handleClose}>Yearly</MenuItem>
//               </Menu>
//             </div>
//           </div>
//         </div>
//         <PayInBar />
//       </div>
//     </div>
//   );
// };
// export default MyBarChart;

"use client";

import PayInBar from "@/components/chart/barChart/myBar";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const dynamicData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  barData: [50, 75, 100, 125],
  backgroundColor: "#4CAF50",
  borderColor: "#4CAF50",
};

const MyBarChart = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [duration, setDuration] = useState("Weekly");
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    handleClose();
  };

  const renderChart = () => {
    switch (duration) {
      case "Weekly":
        return (
          <PayInBar
          //  duration="weekly"
          />
        );
      case "Monthly":
        return (
          <PayInBar
            //  duration="weekly"
            {...dynamicData}
          />
        );
      case "Yearly":
        return (
          <PayInBar
          //  duration="weekly"
          />
        );
      default:
        return (
          <PayInBar
          //  duration="weekly"
          />
        );
    }
  };

  return (
    <div className="flex lg:flex-row flex-col justify-between gap-4 xl:w-1/2">
      <div className="strip-data-card rounded-2xl flex flex-col gap-3 justify-between">
        <div className="text-text-primary flex justify-between items-center w-full">
          <p className="text-[20px] font-bold">Payin Transaction Ratio</p>
          <div className="flex justify-between gap-2">
            <div className="border-2 border-border-color-primary rounded-full px-4 flex justify-center items-center">
              <p className="font-medium text-text-primary">{duration}</p>
            </div>
            <div className="border-2 border-border-color-primary rounded-full">
              <IconButton
                color="primary"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Image src={"/filter.svg"} width={20} height={20} alt={"."} />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => handleDurationChange("Weekly")}>
                  Weekly
                </MenuItem>
                <MenuItem onClick={() => handleDurationChange("Monthly")}>
                  Monthly
                </MenuItem>
                <MenuItem onClick={() => handleDurationChange("Yearly")}>
                  Yearly
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        {renderChart()}
      </div>
    </div>
  );
};

export default MyBarChart;
