import { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import MyDoughnut, {
  MyDoughnutProps,
} from "@/components/chart/doughnoughtChart/myDoughnout";

const MyPieChart = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [duration, setDuration] = useState("Weekly");
  const [chartData, setChartData] = useState<MyDoughnutProps>({});
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`api/data/${duration}`);
      const data = await response.json();
      setChartData(data);
    };

    fetchData();
  }, [duration]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex lg:flex-row flex-col justify-between gap-4 xl:w-1/2">
      <div className="strip-data-card rounded-2xl flex flex-col gap-3 items-center">
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
                <MenuItem
                  onClick={() => {
                    setDuration("Weekly");
                    handleClose();
                  }}
                >
                  Weekly
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setDuration("Monthly");
                    handleClose();
                  }}
                >
                  Monthly
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setDuration("Yearly");
                    handleClose();
                  }}
                >
                  Yearly
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <MyDoughnut {...chartData} />
        <div className="flex gap-4">
          <div className="flex justify-center items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-red-50 border border-border-color-primary"></div>
            <p className="text-text-primary">Success</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-red-50 border border-border-color-primary"></div>
            <p className="text-text-primary">Pending</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-red-50 border border-border-color-primary"></div>
            <p className="text-text-primary">Failed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPieChart;
