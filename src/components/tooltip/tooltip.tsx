import { Button, ClickAwayListener, Tooltip } from "@mui/material";
import { FC, useState } from "react";

interface props {
  item: string;
  copyData: () => void;
}

const TooltipCopy: FC<props> = ({ item, copyData }) => {
  const [openTool, setOpenTool] = useState(false);

  const handleTooltipOpen = () => {
    setOpenTool(true);
  };

  const handleTooltipClose = () => {
    setOpenTool(false);
  };
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={openTool}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="Copied"
        arrow
      >
        <Button
          variant="contained"
          sx={{ borderRadius: 10 }}
          onClick={() => {
            copyData();
            handleTooltipOpen();
          }}
        >
          {item}
        </Button>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default TooltipCopy;
