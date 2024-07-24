import { dropBackColor } from "@/constants/colors";
import { Backdrop } from "@mui/material";
import { FC } from "react";

interface backDrop {
  openBackDrop: boolean;
  className?: string;
}
const BackDropComponent: FC<backDrop> = ({ openBackDrop, className }) => {
  return (
    <Backdrop
      sx={{ color: dropBackColor, zIndex: 1 }}
      open={openBackDrop}
      className={className}
    ></Backdrop>
  );
};

export default BackDropComponent;
