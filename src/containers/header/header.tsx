"use client";
import Image from "next/image";
import NotificationIcon from "@/static/themedIcon";
import { useTheme } from "next-themes";
import DownArrow from "@/static/downArrow";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { darkIconColor, lightIconColor } from "@/constants/colors";
import { Badge } from "@mui/material";

const Header = () => {
  const { setTheme, theme } = useTheme();
  const [myTheme, setMyTheme] = useState(true);

  const handleThemeToggle = () => {
    myTheme ? setTheme("light") : setTheme("dark");
    setMyTheme(!myTheme);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[--background-secondary] flex border-2 rounded-2xl justify-between items-center p-3 px-4 border-border-color-primary"
    >
      <motion.button
        onClick={handleThemeToggle}
        className="flex"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <Image src="/logo.svg" width={150} height={150} alt="logo" />
      </motion.button>

      <div className="flex items-center justify-between gap-6 px-2">
        <Badge badgeContent={4} color="primary">
          <motion.button
            className="icon-buttons rounded-full p-1"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              className="stroke-icon-color stroke-1 "
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.47801 17.2424C9.06774 17.7135 9.84651 18 10.7002 18C11.554 18 12.3327 17.7135 12.9225 17.2424M4.4566 14.8182C4.10525 14.8182 3.90902 14.2662 4.12155 13.9595C4.6147 13.2479 5.0907 12.2043 5.0907 10.9475L5.11104 9.12638C5.11104 5.74288 7.61341 3 10.7002 3C13.8325 3 16.3718 5.78328 16.3718 9.21662L16.3514 10.9475C16.3514 12.2129 16.811 13.2623 17.2841 13.9742C17.4884 14.2816 17.2917 14.8182 16.9447 14.8182H4.4566Z"
                // stroke-linecap="round"
                // stroke-linejoin="round"
              />
            </svg>
          </motion.button>
        </Badge>

        <motion.div
          className="border-[1.75px] icon-buttons rounded-full  "
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`flex justify-around items-center gap-2 p-1 `}>
            <motion.div
              className="bg-primary rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/profilepic.svg"
                height={25}
                width={25}
                alt="profile"
                className=""
              />
            </motion.div>
            <motion.div
              className="cursor-pointer "
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* <DownArrow
                stroke={theme === "light" ? lightIconColor : darkIconColor}
              /> */}
              <svg
                className="stroke-icon-color stroke-1 hover:stroke-[1.75] "
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.9702 6.37512L8.72021 10.6251L4.47021 6.37512"
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default Header;
