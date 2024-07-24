"use client";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/themes/muiThemes";
import { useTheme } from "next-themes";
import { FC } from "react";

interface themeProps {
  children: React.ReactNode;
}

const MaterialThemeProvider: FC<themeProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};

export default MaterialThemeProvider;
