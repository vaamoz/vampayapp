import { Popover } from "@mui/material";
import { FC } from "react";

interface Popup {
  children: React.ReactNode;
  className?: string;
}
const Popup: FC<Popup> = ({ children, className }) => {
  return (
    <section
      className={`popup p-10 shadow-custom rounded-lg bg-background ${className} `}
    >
      {children}
    </section>
  );
};

export default Popup;
